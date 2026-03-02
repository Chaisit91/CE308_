import axois from 'axios';

const API_URL = 'http://10.0.2.2:8080/api/books';

export type Book = {
    boolId :string;
    title: string;
    author: string;
    description: string;
    price:number;

};

export type BookInput ={
    title:string;
    author:string;
    description: string;
    price: number;

};

export const getBooks = async(): Promise<Book[]> => {
    const res = await axois.get(API_URL);
    return res.data;
};