import  { useCallback, useEffect, useState } from "react";


import { _get } from "../../lib/Helper";
import CustomTable from "../Component/CustomTable";

export default function CollectionPointData() {
  const [modal, setModal] = useState(false);
  const [fund, setFund] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredBalance, setFilteredBalance] = useState("");
  const [query, setQuery] = useState("select-all");

  const handleSearch = () => {
    setQuery("search");
    getReg();
  };

  const getReg = useCallback(() => {
    setLoading(true); // Show loading spinner
    _get(`vehicles?query_type=${query}&engine_no=${filter}`, (resp) => {
      if (resp.success && resp.data) {
        setData(resp.data);
        setLoading(false);

        const vehicle = resp.data.find(
          (v) => v.plate_no === filter || v.chasis_no === filter
        );
        if (vehicle) {
          setFilteredBalance(vehicle.balance);
        } else {
          setFilteredBalance("");
        }
      } else {
        setFilteredBalance("");
        setLoading(false);
      }
    });
  }, [query, filter]);

  return (
    <>
      <Card className="app_card dashboard_card shadow m-2 mt-2">
        <div
          style={{
            width: "50%",
            height: "300px",
            background: "#fff",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            marginTop: "20%",
            marginLeft: "25%",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
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
                    placeholder="Search by plate No. or Chasis No."
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Button
                className="app_button text-right"
                style={{
                  padding: 10,
                  marginLeft: 15,
                  color: "#000",
                  textAlign: "center",
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Col>
          </Row>

          <Row>
            {loading ? (
              <Col md={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    marginTop: "20px",
                  }}
                >
                  <Spinner
                    color="primary"
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </div>
              </Col>
            ) : (
              filteredBalance && (
                <Col md={12}>
                  <div
                    style={{
                      marginTop: "20px",
                      fontSize: 20,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>
                      <b>Balance for {filter}:</b>
                    </p>
                    <p>
                      <i>₦{parseFloat(filteredBalance).toFixed(2)}</i>
                    </p>
                  </div>
                </Col>
              )
            )}
          </Row>
        </div>
      </Card>
      <CustomTable page={"point"}/>
    </>
  );
}
