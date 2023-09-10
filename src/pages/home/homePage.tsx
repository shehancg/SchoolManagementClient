import React from "react";
import CustomNavbar from "../../components/navbar/navbar";
import CustomCard from "../../components/cards/card";
import HomePageLayout from "../../layouts/homePage/homePageLayout";

interface ListItem {
  title: string;
  linkTo: string;
  color: string; // New color property
}

const HomePage: React.FC = () => {
  const listItems: ListItem[] = [
    {
      title: "Student Registration",
      linkTo: "/page1",
      color: "#dc8580", // Add color info here
    },
    {
      title: "Add Classroom",
      linkTo: "/page2",
      color: "#7f87b2", // Add color info here
    },
    {
      title: "Teacher Registration",
      linkTo: "/page3",
      color: "#83b2d0", // Add color info here
    },
    {
      title: "Add Subject",
      linkTo: "/page4",
      color: "#95dab6", // Add color info here
    },
    {
      title: "Allocate Subject",
      linkTo: "/page5",
      color: "#ffdab5", // Add color info here
    },
    {
      title: "Allocate Classroom",
      linkTo: "/page6",
      color: "#ecb5ec", // Add color info here
    },
    {
      title: "Student Report",
      linkTo: "/page7",
      color: "#bcd9e7", // Add color info here
    },
  ];

  // Function to chunk the list into rows with a specific size
  const chunkList = (arr: ListItem[], size: number): ListItem[][] => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const rows: ListItem[][] = chunkList(listItems, 3);

  return (
    <HomePageLayout>
      <CustomNavbar />
      <div className="container" style={{ paddingTop: 40 }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row mb-4">
            {row.map((item, index) => (
              <div key={index} className="col-md-4">
                <CustomCard
                  title={item.title}
                  color={item.color} // Pass color directly from item
                  linkTo={item.linkTo}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </HomePageLayout>
  );
};

export default HomePage;
