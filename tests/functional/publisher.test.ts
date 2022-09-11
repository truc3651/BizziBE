import axios from "../axios";
import {ListPublishers} from '../../interfaces/publisher.itf'

describe("publisher", () => {
  it("list publisher", async () => {
    const result = await axios.post('', {
      query: `
          query {
              listPublishers {
                  total
                  data {
                      fullname
                      email
                  }
              }
          }
      `,
    }) as ListPublishers
    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.data).toEqual(
      expect.arrayContaining([
        { fullname: "nguyen truc", email: "thanhtre3651@gmail.com" },
        { fullname: "pikachu", email: "pikachu@gmail.com" },
      ])
    );
  });

  it("publisher login", async () => {
    const result = await axios.post('', {
      query: `
          mutation {
            loginPublisher(email: "lovetruczizz@gmail.com", password: "123")
          }
      `,
    }) as string
    expect(typeof result).toBe("string");
  });
});
