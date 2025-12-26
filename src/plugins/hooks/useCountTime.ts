/**
 * 实现倒计时
 */

export function useCountTime(downNum) {
  const sendBtnText = ref("发送验证码");
  const countDownNum = ref(downNum);

  //这里省略调用发送短信接口逻辑,省略禁止点击逻辑
  const sendCode = () => {
    sendBtnText.value = countDownNum.value + "s";
    const timer = setInterval(() => {
      countDownNum.value--;
      sendBtnText.value = countDownNum.value + "s";
      if (countDownNum.value === 0) {
        clearInterval(timer);
        sendBtnText.value = "发送验证码";
        countDownNum.value = 60;
      }
    }, 1000);
  };
  return { sendBtnText, sendCode };
}

export default { useCountTime };
