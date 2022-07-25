import requireConfig from "util/requireConfig";
import forceIsomorphicConfigValues from "util/validations/forceIsomorphicConfigValues";
import validateCookieExpire from "./tokens/validateCookieExpire";

const isomorphicConfig = {
    apiHost: process.env.NEXT_PUBLIC_API_URI,
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    userCookieExpire: validateCookieExpire(process.env.NEXT_PUBLIC_USER_COOKIE_EXPIRE),
    userCookieName: process.env.NEXT_PUBLIC_USER_COOKIE_NAME,
};

export default forceIsomorphicConfigValues(
    isomorphicConfig,
    [],
    ["apiHost", "defaultLocale", "userCookieName", "userCookieExpire"]
);

type IsomorphicConfig = typeof isomorphicConfig;

const requireConfigValue = (key: keyof IsomorphicConfig) =>
    requireConfig<IsomorphicConfig>(isomorphicConfig, key);

export { requireConfigValue };
