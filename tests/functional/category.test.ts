import axios from "../axios";
import {ListCategories} from '../../interfaces/category.itf'

describe("category", () => {
  it("list category", async () => {
    const result = await axios.post('', {
      query: `
        query {
          listCategories {
            total
            data {
              name
            }
          }
        }
      `,
    }) as ListCategories
    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.data).toEqual(
      expect.arrayContaining([{ name: "the thao" }, { name: "thoi su" }])
    );
  });
});
