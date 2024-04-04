import { paths } from "@/paths";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { isPathnameMatching } from "../is-pathname-matching";
import { getUserCookie } from "@/lib/cookies/user.cookie";
import { fetchGetUser } from "@/app/api/auth-user/fetch";
import { cookieKeys } from "@/lib/cookies/cookie.keys";
import { UserAttrs, User } from "@/db/mongodb/models/user";

export const authorized = async ({
  request,
  auth,
}: {
  request: NextRequest;
  auth: Session | null;
}) => {
  const user = auth?.user;
  const nextUrl = request.nextUrl;
  const isLoggedIn = !!user;
  const [provider, email] = [(auth?.user as any)?.provider, auth?.user?.email!];
  const { isAccountPath, isImagePath } = getPaths(request.nextUrl.pathname);

  if (isImagePath) {
    return true;
  }

  // 로그인이 안되어있으면 로그인 경로로
  if (!isLoggedIn) {
    if (isAccountPath) {
      return redirect(nextUrl.pathname, request);
    } else {
      return redirect(paths.login, request);
    }
  }

  // 로그인이 된 경우 쿠키에 정보를 담아 놓기때문에 userCookie가 있는 경우
  // 로그인이 된 것으로 판단함
  const userCookie = request.cookies?.get(cookieKeys.USER_COOKIE);
  let isRegisted: boolean = !!userCookie;

  // key와 userId가 등록되지 않은 경우 User정보를 조회
  let fetchedUser: UserAttrs | undefined = undefined;
  if (!isAccountPath && !isRegisted) {
    fetchedUser = await fetchGetUser({
      provider: provider,
      email: email!,
    });

    isRegisted = !!fetchedUser.key && !!fetchedUser.localId;
    // 등록되지 않았으면 키등록화면으로 redirect
    if (!isRegisted) {
      return redirect(paths.registKey, request);
    }
  }

  /**
   * 이 부분 부터는 로그인이 되어있다고 간주함
   */

  let response: NextResponse;
  if (isAccountPath && paths.root !== nextUrl.pathname) {
    // 로그인이 안되어있을 경우 접속 가능한 URL에 접속 시 메인화면으로 Redirect
    response = NextResponse.redirect(new URL(paths.root, nextUrl));
  } else {
    response = NextResponse.next();
  }
  if (fetchedUser) {
    const { password, ...user } = fetchedUser;
    response.cookies.set(cookieKeys.USER_COOKIE, JSON.stringify(user), {
      httpOnly: true,
    });
  }
  return response;
};

const redirect = (url: string, request: NextRequest) => {
  const nextUrl = request.nextUrl;
  const pathname = nextUrl.pathname;

  if (url === pathname) return true;

  return Response.redirect(new URL(url, nextUrl));
};

const getPaths = (pathname: string) => {
  const isAccountPath = isPathnameMatching(pathname, [
    "/login",
    "/signup",
    "/find-password",
    "/change-password",
  ]);

  const isImagePath = isPathnameMatching(pathname, ["/images"]);

  const isRegistPath = isPathnameMatching(pathname, [paths.registKey]);

  return { isAccountPath, isRegistPath, isImagePath };
};
