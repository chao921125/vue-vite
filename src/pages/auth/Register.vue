<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
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
  confirmPassword: "",
  email: "",
}) as any;
const formRules: Record<string, any> = reactive({
  userName: [{ validator: ValidateForm.userName, trigger: "blur" }],
  password: [{ validator: ValidateForm.password, trigger: "blur" }],
  confirmPassword: [{ validator: ValidateForm.password, trigger: "blur" }],
  email: [{ validator: ValidateForm.email, trigger: "blur" }],
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

      // ✅ 使用加密存储 Token（安全）
      secureStorage.setToken(String(token));

      // 同时存储到 Cookie（兼容旧逻辑）
      Storage.setCookie(Constants.keys.token, String(token));

      // ❌ 移除明文存储（不安全）
      // Storage.setSessionStorage(Constants.keys.token, token);
      // Storage.setLocalStorage(Constants.keys.token, token);

      Storage.setLocalStorage(Constants.keys.userInfo, token);
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
      proxy.$message.error("注册失败", fields);
      return false;
    }
  });
};

const onToLogin = () => {
  router.push({ path: "/login" });
};
const onToReg = () => {
  router.push({ path: "/register" });
};
</script>

<template>
  <section class="login">
    <div class="login-container">
      <!-- 表单区域 -->
      <div class="login-right">
        <div class="form-wrapper">
          <!-- 标题 -->
          <h1 class="form-title">CCNET</h1>
          <p class="form-subtitle">创建您的账户</p>

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
            <el-form-item class="form-item" label="" prop="confirmPassword">
              <el-input
                v-model="formData.confirmPassword"
                @keyup.enter.native="onLogin(formRef)"
                :disabled="data.isLoading"
                class="form-in"
                type="password"
                placeholder="请确认密码"
              />
            </el-form-item>
            <el-form-item class="form-item" label="" prop="email">
              <el-input
                v-model="formData.email"
                @keyup.enter.native="onLogin(formRef)"
                :disabled="data.isLoading"
                class="form-in"
                placeholder="请输入邮箱"
              />
            </el-form-item>
            <el-form-item class="form-item">
              <div class="re-flex-between re-full-w">
                <el-text class="re-cp txt" type="primary" @click="onToLogin"
                  >已有账号？立即登录</el-text
                >
              </div>
            </el-form-item>
            <el-form-item class="form-item re-flex-center">
              <el-button
                class="re-full-w btn"
                type="primary"
                @click.native.prevent="onLogin(formRef)"
                @keyup.enter.native="onLogin(formRef)"
                :loading="data.isLoading"
                >注册</el-button
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

// 注册页统一样式变量（与登录页保持一致）
$login-title-size: d.$font-size-xl; // 标题字体大小 240px
$login-input-font-size: d.$font-size-md; // 输入框字体大小 70px
$login-btn-height: d.$btn-height-md; // 注册按钮高度 150px
$login-btn-font-size: d.$font-size-md; // 注册按钮字体大小 70px
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
  width: 50%;
  min-width: 2200px;
  max-width: 800px;
  background: #ffffff;
  border-radius: $login-container-radius;
  box-shadow: 0 80px 240px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: stretch;
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
  margin: 0 0 40px 0;
  letter-spacing: 8px;
}

.form-subtitle {
  width: 100%;
  font-size: $login-input-font-size;
  color: #666;
  text-align: center;
  margin: 0 0 80px 0;
}

.form {
  width: 100%;

  .form-item {
    width: 100%;
    padding: 47px 39px;
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
  .login-container {
    width: 90%;
    max-width: 100%;
  }
}
</style>
