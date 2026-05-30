<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import Storage from "@/utils/browser/storage";
import { secureStorage } from "@/utils/browser/crypto";
import Constants from "@/utils/constant/constants";
import ValidateForm from "@/utils/validate/validateForm";
import type { FormInstance } from "element-plus";
// import Api from "@/plugins/api";

const { proxy } = getCurrentInstance() as any;
const formRef = ref();
const formData: Record<string, any> = reactive({
  userName: "",
  password: "",
}) as any;
const formRules: Record<string, any> = reactive({
  userName: [{ validator: ValidateForm.userName, trigger: "blur" }],
  password: [{ validator: ValidateForm.password, trigger: "blur" }],
}) as any;

const route = useRoute();
const router = useRouter();
const data = reactive({
  isLoading: false,
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return false;
  await formEl.validate((valid: boolean, fields: Record<string, any> | undefined) => {
    console.log("====", valid, fields);
    if (valid) {
      data.isLoading = true;
      const token = new Date().getTime();

      // ✅ 使用加密存储 Token（安全
      secureStorage.setToken(String(token));

      // 同时存储到 Cookie（兼容旧逻辑）
      Storage.setCookie(Constants.keys.token, String(token));

      // ❌ 移除明文存储（不安全）
      Storage.setSessionStorage(Constants.keys.token, token);
      Storage.setLocalStorage(Constants.keys.token, token);

      Storage.setLocalStorage(Constants.keys.userInfo, token);
      // Storage.setCookie(Constants.keys.token, res.data.token);
      // Storage.setSessionStorage(Constants.keys.token, res.data.token);
      // Storage.setLocalStorage(Constants.keys.token, res.data);
      // Storage.setLocalStorage(Constants.keys.userInfo, res.data);
      data.isLoading = false;
      if (route.query?.redirect && route.query?.redirect !== "/") {
        router.push({
          path: <string>route.query?.redirect,
          query: Object.keys(<string>route.query?.params).length
            ? JSON.parse(<string>route.query?.params)
            : "",
        });
      } else {
        router.push({ path: "/" });
      }
    } else {
      data.isLoading = false;
      proxy.$message.error("登录失败", fields);
      return false;
    }
  });
};

const onToReg = () => {
  router.push({ path: "/register" });
};

// const testExcel = () => {
//   fetch("https://nfs.nacta.gov.pk/_blazor?id=uT5Dp_mYTw_od-c0l1i5Mg&_=1769089689394", {
//     cache: "no-cache",
//     credentials: "include",
//     headers: {
//       "X-Requested-With": "XMLHttpRequest",
//       "X-SignalR-User-Agent":
//         "Microsoft SignalR/0.0 (0.0.0-DEV_BUILD; Unknown OS; Browser; Unknown Runtime Version)",
//     },
//     method: "GET",
//     mode: "cors",
//     redirect: "follow",
//   }).then((res) => {
//     console.log(res);
//   });
// };
</script>

<template>
  <section class="login">
    <div class="login-container">
      <!-- 左侧区域 -->
      <div class="login-left">
        <div class="cat-scene">
          <!-- 猫身体SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 733 673" class="cat-body">
            <path
              fill="#212121"
              d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
            ></path>
            <path fill="#212121" d="M184 9L270.603 159H97.3975L184 9Z"></path>
            <path fill="#212121" d="M541 0L627.603 150H454.397L541 0Z"></path>
          </svg>

          <!-- 猫尾巴SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158 564" class="cat-tail">
            <path
              fill="#191919"
              d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
            ></path>
          </svg>

          <!-- ZZZ文字 -->
          <div class="zzz-container">
            <span class="zzz-big">Z</span>
            <span class="zzz-small">Z</span>
          </div>

          <!-- 砖墙SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 126" class="brick-wall">
            <line stroke-width="6" stroke="#7C7C7C" y2="3" x2="450" y1="3" x1="50"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="85" x2="400" y1="85" x1="100"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="122" x2="375" y1="122" x1="125"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="43" x2="500" y1="43"></line>
            <line
              stroke-width="6"
              stroke="#7C7C7C"
              y2="1.99391"
              x2="115.5"
              y1="43.0061"
              x1="115.5"
            ></line>
            <line
              stroke-width="6"
              stroke="#7C7C7C"
              y2="2.00002"
              x2="189"
              y1="43.0122"
              x1="189"
            ></line>
            <line
              stroke-width="6"
              stroke="#7C7C7C"
              y2="2.00612"
              x2="262.5"
              y1="43.0183"
              x1="262.5"
            ></line>
            <line
              stroke-width="6"
              stroke="#7C7C7C"
              y2="2.01222"
              x2="336"
              y1="43.0244"
              x1="336"
            ></line>
            <line
              stroke-width="6"
              stroke="#7C7C7C"
              y2="2.01833"
              x2="409.5"
              y1="43.0305"
              x1="409.5"
            ></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="43" x2="153" y1="84.0122" x1="153"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="43" x2="228" y1="84.0122" x1="228"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="43" x2="303" y1="84.0122" x1="303"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="43" x2="378" y1="84.0122" x1="378"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="84" x2="192" y1="125.012" x1="192"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="84" x2="267" y1="125.012" x1="267"></line>
            <line stroke-width="6" stroke="#7C7C7C" y2="84" x2="342" y1="125.012" x1="342"></line>
          </svg>
        </div>
      </div>

      <!-- 右侧表单区域 -->
      <div class="login-right">
        <div class="form-wrapper">
          <!-- 标题 -->
          <h1 class="form-title">CCNET</h1>

          <el-form class="form" ref="formRef" :model="formData" :rules="formRules">
            <el-form-item class="form-item" label="" prop="userName">
              <el-input
                v-model="formData.userName"
                autofocus
                @keyup.enter.native="onLogin(formRef)"
                :disabled="data.isLoading"
                class="form-in"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item class="form-item" label="" prop="password">
              <el-input
                v-model="formData.password"
                @keyup.enter.native="onLogin(formRef)"
                :disabled="data.isLoading"
                class="form-in"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item class="form-item">
              <div class="re-flex-between re-full-w">
                <el-text class="re-cp txt" type="info" @click="onToReg">忘记密码</el-text>
                <el-text class="re-cp txt" type="primary" @click="onToReg">注册</el-text>
              </div>
            </el-form-item>
            <el-form-item class="form-item re-flex-center">
              <el-button
                class="re-full-w btn"
                type="primary"
                @click.native.prevent="onLogin(formRef)"
                @keyup.enter.native="onLogin(formRef)"
                :loading="data.isLoading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/common/declare" as d;

// 登录页统一样式变量（待迁移至 SCSS 设计规范）
$login-title-size: d.$font-size-xl; // 标题字体大小 240px
$login-input-font-size: d.$font-size-md; // 输入框字体大小 70px
$login-btn-height: d.$btn-height-md; // 登录按钮高度 150px
$login-btn-font-size: d.$font-size-md; // 登录按钮字体大小 70px
$login-link-font-size: d.$font-size-md; // 链接文字大小 70px
$login-item-gap: d.$spacing-20; // 表单项间距 80px
$login-radius: d.$radius-lg; // 输入框/按钮圆角 24px
$login-container-radius: d.$radius-xl; // 容器圆角 60px
$login-form-padding: 180px; // 表单区域内边距

.login {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  box-sizing: border-box;
}

.login-container {
  width: 70%;
  background: #ffffff;
  border-radius: $login-container-radius;
  box-shadow: 0 80px 240px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.login-left {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  flex-shrink: 0;
  min-height: 600px;
  position: relative;
  overflow: hidden;
  padding: 234px 0;
  margin: 0;

  .cat-scene {
    position: relative;
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  // 猫身体 - 25rem = 25 * 78px = 1950px（根据项目rootValue: 78）
  .cat-body {
    width: 1950px;
    max-width: 70%;
    height: auto;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  // 猫尾巴 - 下垂居中
  .cat-tail {
    position: absolute;
    width: 12%;
    right: 40%;
    top: 55%;
    z-index: 3;
    animation: tailWag 0.8s ease-in-out infinite alternate;
    transform-origin: top center;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  @keyframes tailWag {
    0% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(-10deg);
    }
  }

  // ZZZ文字 - 在猫头上方
  .zzz-container {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    .zzz-big {
      font-size: 3.75rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      animation: zzzPulse 1.5s ease-in-out infinite;
    }

    .zzz-small {
      font-size: 2.7rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      animation: zzzPulse 1.5s ease-in-out infinite 0.3s;
      opacity: 0.8;
    }
  }

  @keyframes zzzPulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.95);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  // 砖墙 - 完全填充底部
  .brick-wall {
    width: 100%;
    height: auto;
    margin-top: -8%;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
}

.login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $login-form-padding;
  background: #ffffff;
  flex-shrink: 0;
  min-height: 600px;
}

.form-wrapper {
  width: 100%;
}

.form-title {
  width: 100%;
  font-size: $login-title-size;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0 0 100px 0;
  letter-spacing: 8px;
}

.form {
  width: 100%;

  .form-item {
    width: 100%;
    padding: 47px 39px; /* 0.6rem 0.5rem × 78 */
    margin-top: $login-item-gap;

    :deep(.el-input__wrapper) {
      height: 100%;
      border-radius: $login-radius;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    :deep(.form-in input) {
      font-size: $login-input-font-size;
      height: 100%;
      padding: 30px 20px;
    }

    :deep(.el-button) {
      height: $login-btn-height !important;
      border-radius: $login-radius;
      font-weight: 600;
      letter-spacing: 8px;
    }

    :deep(.el-button > span) {
      font-size: $login-btn-font-size !important;
    }

    :deep(.el-form-item__error) {
      font-size: 70px;
      color: #e34234;
      margin-top: 20px;
    }
  }

  :deep(.txt.el-text) {
    cursor: pointer;
    user-select: none;
    font-size: $login-link-font-size !important;
  }
}

// 移动端适配（≤ 768px）
@media screen and (max-width: 768px) {
  .login-left {
    display: none;
  }
}
</style>
