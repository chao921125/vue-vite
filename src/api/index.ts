import common from "./modules/common";
import user from "./modules/user";
import system from "./modules/system";

/**
 * url *
 * method
 * data
 * params get
 */

const api = {
	commonApi: common,
	userApi: user,
	systemApi: system,
};

export default api;
