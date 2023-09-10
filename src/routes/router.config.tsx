// Router.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//page imports
import HomePage from "../pages/home/homePage";
import CommonPage from "../pages/common/common";

//component imports
import StudentRegistration from "../components/student/studentRegistration";
import Classrooms from "../components/classroom/addClass";
import TeacherRegistration from "../components/teachers/teacherRegistration";
import SubjectRegistration from "../components/subjects/addSubjects";

import HomePageLayout from "../layouts/homePage/homePageLayout";
import AllocateSubjects from "../components/allocateSubject/allocateSubject";
import AllocateClassrooms from "../components/allocateClassroom/allocateClassroom";
import StudentReport from "../components/student/studentReport";
import LoginForm from "../pages/common/loginform";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePageLayout>
              <LoginForm />
            </HomePageLayout>
          }
        />
        <Route
          path="/home"
          element={
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          }
        />
        <Route
          path="/page1"
          element={
            <HomePageLayout>
              <CommonPage>
                <StudentRegistration />
              </CommonPage>
            </HomePageLayout>
          }
        />
        <Route
          path="/page2"
          element={
            <HomePageLayout>
              <CommonPage>
                <Classrooms />
              </CommonPage>
            </HomePageLayout>
          }
        />
        <Route
          path="/page3"
          element={
            <HomePageLayout>
              <CommonPage>
                <TeacherRegistration />
              </CommonPage>
            </HomePageLayout>
          }
        />
        <Route
          path="/page4"
          element={
            <HomePageLayout>
              <CommonPage>
                <SubjectRegistration />
              </CommonPage>
            </HomePageLayout>
          }
        />
        <Route
          path="/page5"
          element={
            <HomePageLayout>
              <CommonPage>
                <AllocateSubjects />
              </CommonPage>
            </HomePageLayout>
          }
        />
        <Route
          path="/page6"
          element={
            <HomePageLayout>
              <CommonPage>
                <AllocateClassrooms />
              </CommonPage>
            </HomePageLayout>
          }
        />
        <Route
          path="/page7"
          element={
            <HomePageLayout>
              <CommonPage>
                <StudentReport />
              </CommonPage>
            </HomePageLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
