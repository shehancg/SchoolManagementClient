// pages/HomePage.tsx

import React, { ReactNode } from "react";
import CustomNavbar from "../../components/navbar/navbar";
import StudentRegistration from "../../components/student/studentRegistration";
import HomePageLayout from "../../layouts/homePage/homePageLayout"; 

interface CommonPageLayoutProps {
    children: ReactNode;
  }

const CommonPage: React.FC<CommonPageLayoutProps> = ({children}) => {
  return (
    <HomePageLayout>
      <CustomNavbar />
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          {/* Other content */}
          {children}
        </div>
      </div>
    </HomePageLayout>
  );
};

export default CommonPage;
