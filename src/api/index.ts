import common from "./modules/common";
import user from "./modules/user";
import system from "./modules/system";
import inventory from "./modules/inventory";

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
  inventoryApi: inventory,
};

export default api;
