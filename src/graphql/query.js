import { gql } from "@apollo/client";

export const GET_LOGIN = gql`
  query Getlogin($uuid: String) {
    getlogin(uuid: $uuid) {
      _id
      name
      email
      number
      uuid
      status
      role
      Location
      Place
    }
  }
`;
export const GET_ALL_CATS = gql`
  query GetCats {
    getCats {
      _id
      name
    }
  }
`;
export const GET_ALL_FOODS = gql`
  query GetAllFoods {
    getAllFoods {
      _id
      name
      price
      description
      image
      category {
        _id
        name
      }
      veg
    }
  }
`;
export const GET_FOOD = gql`
  query GetOneFood($id: String) {
    getOneFood(_id: $id) {
      _id
      name
      price
      description
      image
      category {
        _id
        name
      }
      veg
    }
  }
`;
export const GET_ALL_PERSON = gql`
  query GetAllPerson {
    getAllPerson {
      _id
      name
      phone
      image
    }
  }
`;
export const GET_ALL_ORDER = gql`
  query GetAllorder {
    getAllorder {
      _id
      cart
      price
      user {
        _id
        name
        email
        number
        uuid
        status
        role
        Location
        Place
      }
      createdAt
      status
      delivery {
        _id
        name
        phone
        image
      }
    }
  }
`;

export const GET_ONEALL_ORDER = gql`
  query GetOneorder($uuid: String) {
    getOneorder(uuid: $uuid) {
      _id
      cart
      price
      user {
        _id
        name
        email
        number
        uuid
        status
        role
        Location
        Place
      }
      createdAt
      status
      delivery {
        _id
        name
        phone
        image
      }
    }
  }
`;
