// layouts/HomePageLayout.tsx

import React, { ReactNode } from "react";

interface HomePageLayoutProps {
  children: ReactNode;
}

const HomePageLayout: React.FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div className="home-page-layout">
      {children}
    </div>
  );
};

export default HomePageLayout;
