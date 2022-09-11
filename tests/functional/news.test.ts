
// // @ts-nocheck
import axios from "../axios";
import env from "../../configs/env";
import mongoose from '../../mongoose'
import NewsService from "../../services/news";
import {News, ListNews} from '../../interfaces/news.itf'
import {ListCategories} from '../../interfaces/category.itf'

describe("news", () => {
  // beforeAll(async () => {
  //   const newsService = new NewsService();
  //   const res = await newsService.deleteAll();
  // });

  let token: string;

  it("login", async () => {
    const result = await axios.post("", {
      query: `
        mutation {
            loginPublisher(email: "thanhtre3651@gmail.com", password: "123")
        }
    `,
    }) as string
    expect(typeof result).toBe("string");
    token = result;
  });

  it("create news", async () => {
    const categories = await axios.post("", {
      query: `
            query {
                listCategories {
                    data {
                        id
                        name
                    }
                }
            }
        `,
    }) as ListCategories
    const result = await axios.post(
      "",
      {
        query: `
            mutation {
                createNews(title: "soccer", content: "hahaha", categoryId: "${categories.data[0].id}") {
                    title
                    content
                    category {
                        name
                    }
                }
            }
        `,
      },
      {
        params: {
            token
        },
      }
    ) as News
    expect(result.title).toBe("soccer");
    expect(result).toHaveProperty("category.name", categories.data[0].name);
  });

//   it("list news", async () => {
//     const result = await axios.post("", {
//       query: `
//             query {
//                 listNews {
//                     total
//                     data {
//                         title
//                         content
//                     }
//                 }
//             }
//         `,
//     });
//     expect(result.data).toHaveLength(1);
//     expect(result.data[0]).toHaveProperty("title", "soccer");
//     expect(result.data[0]).toHaveProperty("content", "hahaha");
//   });

//     it("list my news", async () => {
//       const result = await axios.post(
//         "",
//         {
//           query: `
//               query {
//                 listMyNews {
//                   data {
//                     title
//                   }
//                 }
//               }
//             `,
//         },
//         {
//             params: {
//                 token
//             },
//           }
//       );
//       console.log(">>result", result);
//       expect(result.data).toHaveLength(1);
//       expect(result.data[0]).toMatchObject({
//         title: "soccer",
//       });
//     });
});
