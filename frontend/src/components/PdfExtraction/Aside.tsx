import { List } from "antd";
import React from "react";

const Aside = ({ res }: { res: any }): JSX.Element => {
  return (
    <aside className="w-full lg:w-80 md:max-h-screen bg-white dark:bg-gray-1 text-gray-1 dark:text-white p-5 shadow-lg">
      <h2 className="text-base lg:text-lg mb-10">Réferences</h2>
      {res?.length === 0 ? (
        <p className="text-center text-sm lg:text-base text-[#475569] dark:text-white">
          No corrections available. Well done!
        </p>
      ) : (
        <div
          style={{
            height: "550px",
            overflowY: "scroll",
          }}
        >
          <List>
            {res.map((item: any, index: number) => (
              <List.Item key={index}>
                <List.Item.Meta description={item} />
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </aside>
  );
};

export default Aside;
