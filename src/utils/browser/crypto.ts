/**
 * 加密存储工具
 * 用于安全存储敏感信息（如 Token）
 *
 * 注意：这是过渡方案，最终应使用 HttpOnly Cookie
 */

// 简单的 XOR 加密（轻量级，不依赖第三方库）
// 生产环境建议替换为 AES 加密

/**
 * 获取加密密钥
 * 优先使用环境变量，否则使用默认值
 */
const getEncryptionKey = (): string => {
  return import.meta.env.VITE_ENCRYPTION_KEY || "vue-vite-default-key-2026";
};

/**
 * 简单加密（XOR + Base64）
 * @param text 明文
 * @returns 密文
 */
export const encrypt = (text: string): string => {
  if (!text) return "";

  const key = getEncryptionKey();
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }

  // Base64 编码
  try {
    return btoa(result);
  } catch (error) {
    // 处理中文字符
    return btoa(unescape(encodeURIComponent(result)));
  }
};

/**
 * 简单解密（Base64 + XOR）
 * @param encryptedText 密文
 * @returns 明文
 */
export const decrypt = (encryptedText: string): string => {
  if (!encryptedText) return "";

  try {
    // Base64 解码
    let decoded = atob(encryptedText);

    // 处理中文字符
    try {
      decoded = decodeURIComponent(escape(decoded));
    } catch (e) {
      // 如果不是 UTF-8 编码，使用原值
    }

    const key = getEncryptionKey();
    let result = "";

    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }

    return result;
  } catch (error) {
    console.error("解密失败:", error);
    return "";
  }
};

/**
 * 安全存储对象
 * 提供加密的 Token 存取方法
 */
export const secureStorage = {
  /**
   * 安全存储 Token
   * @param token Token 值
   */
  setToken: (token: string): void => {
    if (!token) return;
    const encrypted = encrypt(token);
    localStorage.setItem("auth-token-encrypted", encrypted);
  },

  /**
   * 安全获取 Token
   * @returns 解密后的 Token，失败返回 null
   */
  getToken: (): string | null => {
    const encrypted = localStorage.getItem("auth-token-encrypted");
    if (!encrypted) return null;

    try {
      const token = decrypt(encrypted);
      return token || null;
    } catch (error) {
      console.error("Token 解密失败:", error);
      return null;
    }
  },

  /**
   * 移除 Token
   */
  removeToken: (): void => {
    localStorage.removeItem("auth-token-encrypted");
  },

  /**
   * 检查 Token 是否存在
   */
  hasToken: (): boolean => {
    return !!localStorage.getItem("auth-token-encrypted");
  },
};
