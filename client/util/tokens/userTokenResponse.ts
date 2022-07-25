import Cookies from "js-cookie";
import { requireConfigValue } from "../isomorphicConfig";
import UserTokenResponseParseError from "util/errors/UserTokenResponseParseError";
import { UserOAuth } from "spree/types/auth";

export const getUserTokenResponse = (): UserOAuth | undefined => {
    const stringifiedToken = Cookies.get(requireConfigValue("userCookieName") as string);

    if (!stringifiedToken) {
        return undefined;
    }

    try {
        const token: UserOAuth = JSON.parse(stringifiedToken);

        return token;
    } catch (parseError) {
        throw new UserTokenResponseParseError(
            "Could not parse stored user token response."
        );
    }
};

/**
 * Retrieves the saved user token response. If the response fails json parsing,
 * removes the saved token and returns @type {undefined} instead.
 */
export const ensureUserTokenResponse = (): UserOAuth | undefined => {
    try {
        return getUserTokenResponse();
    } catch (error) {
        if (error instanceof UserTokenResponseParseError) {
            removeUserTokenResponse();

            return undefined;
        }

        throw error;
    }
};

export const setUserTokenResponse = (token: UserOAuth) => {
    const cookieOptions = {
        expires: requireConfigValue("userCookieExpire") as number,
    };

    Cookies.set(
        requireConfigValue("userCookieName") as string,
        JSON.stringify(token),
        cookieOptions
    );
};

export const removeUserTokenResponse = () => {
    Cookies.remove(requireConfigValue("userCookieName") as string);
};
