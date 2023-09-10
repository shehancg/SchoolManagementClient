// components/Card.js

import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import "./card.sass"
import { Link } from "react-router-dom";

interface CustomCardProps {
  title: string;
  linkTo: string; 
  color: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, color , linkTo }) => {
  return (
    <Card className="custom-card" style={{ backgroundColor: color }}>
      <Link to={linkTo}>
        <div className="d-flex">
          <CardBody className="flex-grow-1">
            <CardTitle style={{ color:"white", fontSize:"larger", alignSelf:"center"}}>{title}</CardTitle>
          </CardBody>
        </div>
      </Link>
    </Card>
  );
};

export default CustomCard;
