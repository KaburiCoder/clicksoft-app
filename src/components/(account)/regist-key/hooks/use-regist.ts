import { registKey, validRegistKeyAction } from "@/db/actions/regist-key";
import { emitPaths } from "@/paths";
import { Certification } from "@/sockets/models/certification";
import { useSocket } from "@/sockets/socket.provider";
import { useSession } from "next-auth/react";
import { startTransition, useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface RegistArgs extends CerticiationArgs { }

interface CerticiationArgs {
  key: string;
  localId: string;
  password: string;
}

interface UseRegistArgs {
  onSuccess: () => void;
}

export const useRegist = ({ onSuccess }: UseRegistArgs) => {
  const { socket } = useSocket();
  const { data: session } = useSession();
  const { email, name } = session?.user || {};
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function certification(args: CerticiationArgs): Promise<Certification> {
    return await socket?.timeout(5000).emitWithAck(emitPaths.certification, {
      ...args,
    });
  }

  async function regist(args: RegistArgs) {
    setPending(true);
    try {
      const result = await certification(args);
      if (result.status !== "success") {
        throw new Error(result.message);
      }

      const registResult = await registKey({
        email: email ?? "",
        key: args.key,
        localId: args.localId,
        name: result.name,
      });

      if (registResult.status !== "success") {
        throw new Error("계정 저장 중 오류가 발생했습니다.");
      }

      onSuccess();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setPending(false);
    }
  }

  return { pending, email, name, errorMessage, regist };
};
