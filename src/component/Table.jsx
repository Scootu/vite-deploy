import React from "react";

export const Table = (data) => {
  let productsData = data.data;
  
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th
            className="tracking-wider leading-[1.05rem] p-[0.5rem] text-left text-[0.9em] whitespace-nowrap text-[#777] border-b-[3px] border-b-[#ececec] "
            colSpan={4}
          >
            Product
          </th>
          <th className="tracking-wider leading-[1.05rem] p-[0.5rem] text-left text-[0.9em] whitespace-nowrap text-[#777] border-b-[3px] border-b-[#ececec] ">
            PRICE
          </th>
          <th className="tracking-wider leading-[1.05rem] p-[0.5rem] text-left text-[0.9em] whitespace-nowrap text-[#777] border-b-[3px] border-b-[#ececec] ">
            QUANTITY
          </th>
          <th className="tracking-wider leading-[1.05rem] p-[0.5rem] text-left text-[0.9em] whitespace-nowrap text-[#777] border-b-[3px] border-b-[#ececec] ">
            Size and Color
          </th>
          <th className="tracking-wider leading-[1.05rem] p-[0.5rem] text-left text-[0.9em] whitespace-nowrap text-[#777] border-b-[3px] border-b-[#ececec] ">
            SUBTOTAL
          </th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="underline py-[15px]">re</td>
              <td className=" py-[15px] text-[.9em]">
                <img src={item.images[0]} alt="img" />
              </td>
              <td className=" py-[15px] text-[.9em]">{item.name}</td>
              <td></td>
              <td className=" py-[15px] text-[.9em]">{item.prices[0].price}</td>
              <td className=" py-[15px] text-[.9em]">{item.nbItems}</td>
              <td className=" py-[15px] text-[.9em]">{item.prices[0].size}</td>
              <td className=" py-[15px] text-[.9em]">
                {item.prices[0].price * item.nbItems}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
