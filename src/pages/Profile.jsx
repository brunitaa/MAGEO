import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ajax from "../Services/fetchService";

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    if (user.jwt) {
      console.log(user.jwt);
      ajax("api/profile/" + user.id, "GET", user.jwt)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.warn("No valid jwt found, redirecting to login page");
      navigate("/loginPage");
    }
  }, [user]);

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>User Information</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {userData.username} {userData.apellido}
                  <br />
                  <strong>Email:</strong> {userData.correo_electronico}
                  <br />
                  <strong>Phone:</strong> {userData.telefono}
                  <br />
                  <strong>Date of Birth:</strong> {userData.fecha_nacimiento}
                  <br />
                  <strong>Gender:</strong> {userData.genero}
                  <br />
                  <strong>Location:</strong> {userData.sede},{" "}
                  {userData.departamento}
                  <br />
                  <strong>Role:</strong> {userData.role}
                  <br />
                  <strong>Position:</strong> {userData.cargo}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Profile;
