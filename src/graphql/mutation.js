import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation OnSignup($login: loginInput) {
    onSignup(login: $login)
  }
`;
export const CONFIRM_USER = gql`
  mutation ConfirmSignup($login: loginInput) {
    confirmSignup(login: $login)
  }
`;
export const LOGIN_USER = gql`
  mutation OnLogin($login: loginInput) {
    onLogin(login: $login)
  }
`;
export const OTP_RESEND = gql`
  mutation OtpResend($login: loginInput) {
    otpResend(login: $login)
  }
`;
export const PASSWORD_OTP = gql`
  mutation PasswordOtp($login: loginInput) {
    passwordOtp(login: $login)
  }
`;
export const CONFIRM_OTP = gql`
  mutation ConfirmOtp($login: loginInput) {
    confirmOtp(login: $login)
  }
`;
export const NEW_PASSWORD = gql`
  mutation NewPassword($login: loginInput) {
    newPassword(login: $login)
  }
`;
export const ADD_CATS = gql`
  mutation AddCategory($category: categoryInput) {
    addCategory(category: $category)
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String) {
    updateCategory(_id: $id)
  }
`;
export const ADD_FOOD = gql`
  mutation AddFood($food: foodInput) {
    addFood(food: $food)
  }
`;
export const UPDATE_FOOD = gql`
  mutation UpdateFood($id: String, $food: foodInput) {
    updateFood(_id: $id, food: $food)
  }
`;
export const DELETE_FOOD = gql`
  mutation DeleteFood($id: String) {
    deleteFood(_id: $id)
  }
`;
export const ADD_ADDRESS = gql`
  mutation AddAddress($uuid: String, $login: loginInput) {
    addAddress(uuid: $uuid, login: $login)
  }
`;
export const ADD_DELIVERY_PERSON = gql`
  mutation AddDeliveryperson($delivery: deliveryInput) {
    addDeliveryperson(delivery: $delivery)
  }
`;
export const DELETE__DELIVERY_PERSON = gql`
  mutation UpdateDeliveryperson($id: String) {
    updateDeliveryperson(_id: $id)
  }
`;
export const CREATE_ORDER = gql`
  mutation CreateOrder($orderplaced: OrderplacedInput) {
    createOrder(Orderplaced: $orderplaced)
  }
`;
