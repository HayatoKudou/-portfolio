// const emailValidation = (email: string): string => {
//   if (!email) return 'メールアドレスを入力してください';
//
//   const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   if (!regex.test(email)) return '正しい形式でメールアドレスを入力してください';
//
//   return '';
// };
//
// const contentValidation = (content: string): string => {
//   if (!content) return '内容を入力してください';
//   if (content.length < 200) return '内容は200文字以上で入力してください';
//
//   return '';
// };
//
// class Validation {
//   static formValidate = (type: string, value: string) => {
//       console.log(type);
//       console.log(value);
//     switch (type) {
//       case 'email':
//         return emailValidation(value);
//       case 'content':
//         return contentValidation(value);
//     }
//   };
// }
//
// export default Validation;
