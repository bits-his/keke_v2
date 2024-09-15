import React, { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
// import Modal from "react-modal";
import QRCode from "react-qr-code";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Spinner,
  NavLink,
} from "reactstrap";
import { _get } from "../../../lib/Helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function TopUp() {
  // const navigate = useNavigate()
  const [modal, setModal] = useState(false);
  const [fund, setFund] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [userDetail, setUserDetail] = useState({
    Reg_no: "",
    Plate_no: "",
  });
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const [query, setQuery] = useState("select-all");

  const search = () => {
    setQuery("search");
  };

  const goto = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  const fund_us = () => {
    setFund(true);
    toggleModal();
  };
  // const agentDetails = {
  //   name: "Ahmad Ibrahim",
  //   id: 123,
  //   bal: 2000,
  // };
  const getReg = useCallback(() => {
    setLoading(true);
    _get(`vehicles?query_type=${query}&engine_no=${filter}`, (resp) => {
      if (resp.success && resp.data) {
        setData(resp.data);
        setLoading(false);
        // console.log(resp);
      }
    });
    // _get(`vendors?query_type=select-all&plate_no=${filter}`, (resp) => {
    //   setLoading(false); // Set loading to false after receiving response
    //   if (resp.success && resp.results) {
    //     setVendorData(resp.results);
    //   }
    // });
  }, [query]);
  useEffect(() => {
    if (!filter) {
      setQuery("select-all");
    }
  }, [filter]);
  useEffect(() => {
    getReg();
  }, [getReg]);

  return (
    <>
      <Card className="app_card dashboard_card shadow m-2 mt-2">
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 className="app_title"> Point of Collection</h4>
            </div>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col md={12}>
            <div className="search-bar-box">
              <div className="search">
                <CiSearch
                  style={{
                    fontSize: 30,
                    width: 25,
                    marginTop: 3,
                    color: "#000",
                  }}
                />
                <input
                  name="filter"
                  value={filter}
                  type="text"
                  className="app_input2"
                  onChange={({ target: { value } }) => setFilter(value)}
                  style={{
                    width: "100%",
                    fontSize: 20,
                  }}
                  placeholder="Search Vehicle Owner"
                />
              </div>
              <label onClick={search} className="label_title">
                Search
              </label>
            </div>
          </Col>
          <div className="table_overflow">
            {loading ? (
              <Spinner
                color="warning"
                className="spinner"
                type="grow"
                style={{ margin: "20px auto" }}
              >
                ""
              </Spinner>
            ) : data?.length === 0 ? (
              <Table
                bordered
                responsive
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "4px",
                }}
              >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Balance</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Vehicle {filter} found
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <Table
                bordered
                responsive
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "4px",
                }}
              >
                <thead>
                  <tr>
                    <th>Vehicle ID.</th>
                    <th>Plate No.</th>
                    <th>Chasis No.</th>
                    <th>Balance (₦)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((vehicle, idx) => (
                    <tr key={idx}>
                      <td>{vehicle.vehicle_id}</td>
                      <td>{vehicle.plate_no}</td>
                      <td>{vehicle.chasis_no}</td>
                      <td className="text-right">
                        {parseFloat(vehicle.balance).toFixed(2)}
                      </td>
                      <td className="text-center p-2">
                        <ButtonGroup>
                          <Button
                            onClick={() => {
                              navigate(`${vehicle.vehicle_id}`);
                              setCurrentItem(vehicle);
                              //handlePay(id);
                            }}
                            color="success"
                          >
                            Transactions
                          </Button>
                          <Button
                            color="info"
                            onClick={() => {
                              navigate(`/licens-pdf/${vehicle.vehicle_id}`);
                            }}
                          >
                            View License
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>

          {/* <Modal
            isOpen={modal}
            toggle={toggleModal}
            style={{
              content: {
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              },
            }}
          >
            <ModalHeader
              toggle={toggleModal}
              style={{ paddingTop: "6rem" }}
              centered
            >
              <div style={{ float: "right" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  onClick={() => toggleModal()}
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </div>
            </ModalHeader>
            <ModalBody>
              <div style={{ textAlign: "center" }}>
                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "20%",
                    width: "20%",
                  }}
                  value={userDetail.Reg_no}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>Reg No: 00{currentItem.vehicle_id}</h3>
                <h3>Plate No: {currentItem.plate_no}</h3>
                <h3>Balance: ₦{parseFloat(currentItem.balance).toFixed(2)}</h3>
              </div>
              <Form>
                <FormGroup>
                  <Label for="topUpAmount">Amount</Label>
                  <Input
                    type="text"
                    name="topUpAmount"
                    id="topUpAmount"
                    placeholder="Enter amount here"
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    color="warning"
                    block
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    onClick={fund_us}
                  >
                    pay
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal> */}

          {/* {fund ? (
            <div>
              <Form
                style={{
                  position: "relative",
                  top: "-40rem",
                  left: "25rem",
                  backgroundColor: "white",
                  borderRadius: " 5px",
                  height: "55rem",
                  width: "50%",
                  border: "1px solid black",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    left: "40%",
                    top: "15px",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  Top Up
                </div>
                <hr
                  style={{ width: "95%", position: "relative", left: "12px" }}
                />
                <FormGroup>
                  <div
                    for="topUpAmount"
                    style={{
                      position: "relative",
                      top: "25px",
                      left: "20px",
                      fontWeight: "600",
                      marginBottom: "15px",
                    }}
                  >
                    Balance: 20000
                  </div>
                  <Label
                    for="topUpAmount"
                    style={{ position: "relative", top: "25px", left: "20px" }}
                  >
                    Enter Amount:
                  </Label>
                  <Input
                    type="text"
                    name="topUpAmount"
                    id="topUpAmount"
                    placeholder="Enter amount here"
                    style={{
                      position: "relative",
                      width: "70%",
                      left: "26%",
                    }}
                  />
                  <Label
                    for="topUpAmount"
                    style={{ position: "relative", top: "25px", left: "20px" }}
                  >
                    Plate No:
                  </Label>
                  <Input
                    type="text"
                    name="topUpAmount"
                    id="topUpAmount"
                    placeholder="Enter amount here"
                    style={{
                      position: "relative",
                      width: "70%",
                      left: "26%",
                    }}
                  />
                  <Label
                    for="topUpAmount"
                    style={{ position: "relative", top: "25px", left: "20px" }}
                  >
                    Class No:
                  </Label>
                  <Input
                    type="text"
                    name="topUpAmount"
                    id="topUpAmount"
                    placeholder="Enter amount here"
                    style={{
                      position: "relative",
                      width: "70%",
                      left: "26%",
                    }}
                  />
                  <Label
                    for="topUpAmount"
                    style={{ position: "relative", top: "25px", left: "20px" }}
                  >
                    Last Pay Date:
                  </Label>
                  <Input
                    type="text"
                    name="topUpAmount"
                    id="topUpAmount"
                    placeholder="Enter amount here"
                    style={{
                      position: "relative",
                      width: "70%",
                      left: "26%",
                    }}
                  />
                  <Label
                    for="topUpAmount"
                    style={{ position: "relative", top: "25px", left: "20px" }}
                  >
                    Payment From:
                  </Label>
                  <Input
                    type="text"
                    name="topUpAmount"
                    id="topUpAmount"
                    placeholder="Enter amount here"
                    style={{
                      position: "relative",
                      width: "70%",
                      left: "26%",
                    }}
                  />
                  <Label
                    for="topUpAmount"
                    style={{ position: "relative", top: "25px", left: "20px" }}
                  >
                    Payment To:
                  </Label>
                  <Input
                    type="text"
                    name="topUpAmount"
                    id="topUpAmount"
                    placeholder="Enter amount here"
                    style={{
                      position: "relative",
                      width: "70%",
                      left: "26%",
                    }}
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    color="warning"
                    block
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "30%",
                    }}
                    onClick={fund_us}
                  >
                    pay
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <></>
          )} */}
        </Row>
      </Card>
    </>
  );
}
