import "./styles.css";
import { useReducer, useState, useEffect } from "react";
import { Button, TextField, Grid, Typography, Box, Card } from "@mui/material";
import Users from "./data";
import Label from "./Label";
import Content from "./Content";
/** Instructions
   0. Fork this codesandbox and sync it with your github 
   1. import users data from data.ts
   1.1. Utilize TypeScript in your implementation
   2. On load:
   2.1. Filter the users data array to only include users where age >= 18
   2.2. Map the users data array to only include username, address, age and companyName
   2.3. Add a new ID to each user object, which should consist of a randomized sequence (6 characters) of the following: {ABCDEF123456}
   2.4. Sort the array (asc) by age, then by companyName
   2.5. Dispatch the data to the local users state
   3. Display the users' properties using a loop in the tsx, preferably in a styled "Card" form
   3.1. Add a "remove" button to each card - this should remove the user from the state
   3.2. Store the removed users in a new state instance
   3.3. Using the second input, add a method to search for a user's username with the onChange event
   3.4. The removed users should also be found if the input is being used to search for a username
   3.5. In the case where a removed user is shown during a search, there should be a "restore" button, which would insert the removed user back into the users array
   4. Extend the reducer:
   4.1. Count must always be >= 0, in all cases
   4.2. Add a case to increment count with a random number, between 1 and 10
   4.3. Add a case to increment to the nearest odd number, if already odd - increment to next odd
   4.4. Add a case to decrease the count by the input of the first textfield
   4.5. Add a case to reset the count
   4.6. Add buttons to said cases
   4.7. Add styling using MUI
   5. Provide the link to your forked repo with your answers
   */
// =========================================================
/*I am not familer with typescipt thats why I am using js*/
// =========================================================

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count >= 1 ? state.count - 1 : 0 };

    case "random":
      return { count: state.count + action.payload };

    case "oddNo":
      return { count: state.count + action.payload };

    case "decrementByValue":
      return {
        count: action.payload < state.count ? state.count - action.payload : 0,
      };

    default:
      throw new Error();
  }
}
export default function App() {
  const [users, setUsers] = useState([]);
  const [ageAsc, setAgeAsc] = useState(true);
  const [cNameAsc, setCNameAsc] = useState(true);
  const [removed, setremoved] = useState([]);
  const [numberInput, setNumberInput] = useState(0);
  const [text, setText] = useState("");
  const [allData, setAllData] = useState([]);
  const [countState, dispatch] = useReducer(reducer, { count: 0 });
  const [query, setQuery] = useState("");
  useEffect(() => {
    filterData();
  }, []);
  const filterData = () => {
    setAllData(
      Users.filter((item) => item.age > 18).map((item) => {
        return { ...item, status: "active" };
      })
    );
    setUsers(
      Users.filter((item) => item.age > 18).map((item) => {
        return { ...item, status: "active" };
      })
    );
  };
  const randId = () => {
    let chars = "ABCDEF123456";
    let id = "";
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * chars.length);
      id += chars[index];
    }
    return id;
  };

  const sortingData = (key) => {
    let data = [];
    if (ageAsc) {
      data = [...allData].sort((a, b) => a.age - b.age);
    } else {
      data = [...allData].sort((a, b) => b.age - a.age);
    }
    setAgeAsc(!ageAsc);
    setAllData(data);
  };
  const sortingDataCName = (key) => {
    let data = [];

    if (cNameAsc) {
      data = [...allData].sort((a, b) =>
        a.company.name.localeCompare(b.company.name)
      );
      setCNameAsc(false);
    } else {
      data = [...allData].sort((a, b) =>
        b.company.name.localeCompare(a.company.name)
      );
      setCNameAsc(true);
    }
    setAllData(data);
  };

  const removeHandler = (id) => {
    let removedData = [...users, ...removed].map((item) => {
      if (item.id == id) {
        return { ...item, status: "inactive" };
      }
      return item;
    });
    let dataOne = removedData.filter((item) => item.status == "active");
    let dataTwo = removedData.filter((item) => item.status == "inactive");
    setUsers(dataOne);
    setremoved(dataTwo);
    let filterData = [...dataOne, ...dataTwo].filter((item) =>
      item.username.toLowerCase().includes(query.toLowerCase())
    );
    setAllData(filterData);
  };

  const restore = (id) => {
    let removedData = [...users, ...removed].map((item) => {
      if (item.id == id) {
        return { ...item, status: "active" };
      }
      return item;
    });
    let dataOne = removedData.filter((item) => item.status == "active");
    let dataTwo = removedData.filter((item) => item.status == "inactive");
    setUsers(dataOne);
    setremoved(dataTwo);
    let filterData = [...dataOne, ...dataTwo].filter((item) =>
      item.username.toLowerCase().includes(query.toLowerCase())
    );
    setAllData(filterData);
  };
  console.log(allData, users, removed, "removed");
  const [screen, setScreen] = useState(false);
  return (
    <div className="App">
      <Card>
        <Box p={2}>
          <Grid container spacing={2}>
            {!screen && (
              <>
                <Grid item>
                  <TextField
                    size="small"
                    placeholder="Search For User"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (e.target.value.length > 0) {
                        setText(true);
                        let filterData = [...users, ...removed].filter((item) =>
                          item.username
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        );
                        setAllData(filterData);
                      } else {
                        setText(false);
                        setAllData([...users, ...removed]);
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      sortingData();
                    }}
                  >
                    {ageAsc ? "Age Asc" : "Age Des"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      sortingDataCName();
                    }}
                  >
                    {cNameAsc ? "Company Name Asc" : "Company Name Des"}
                  </Button>
                </Grid>
              </>
            )}{" "}
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  setScreen(!screen);
                }}
              >
                {screen ? "Search" : "Counter"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      {!screen ? (
        <div className="data">
          {allData
            .filter((item) => (text ? item.status : item.status == "active"))
            .map((item) => (
              <Box py={1} className="child" key={item.id}>
                <Box p={1}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm>
                      <Label>Random ID</Label>
                      <Content>{randId()} </Content>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Label>Name</Label>
                      <Content>{item.username} </Content>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Label>Age</Label>
                      <Content>{item.age} </Content>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Label>Address</Label>
                      <Content>{item.address.street}</Content>
                    </Grid>
                    <Grid item xs={12} sm>
                      <Label>Company</Label>
                      <Content>{item.company.name}</Content>
                    </Grid>
                    {item.status == "active" && (
                      <Grid item xs={12} sm>
                        <Button
                          sx={{ fontSize: 10 }}
                          variant="outlined"
                          onClick={() => {
                            removeHandler(item.id);
                          }}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                    {item.status == "inactive" && (
                      <Grid item xs={12} sm>
                        <Button
                          color="secondary"
                          sx={{ fontSize: 10 }}
                          variant="outlined"
                          onClick={() => {
                            restore(item.id);
                          }}
                        >
                          Restore
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Box>
            ))}
        </div>
      ) : (
        <>
          <Box pt={2}>
            <Card>
              <Box p={3}>
                <p style={{ marginBottom: 0 }}>Count: {countState.count}</p>
                <TextField
                  defaultValue={numberInput}
                  type="number"
                  style={{ display: "block" }}
                  onChange={(e) => {
                    setNumberInput(e.target.value);
                  }}
                />
                <Box pt={3}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => dispatch({ type: "decrement" })}
                      >
                        -
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => dispatch({ type: "increment" })}
                      >
                        +
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          let random = Math.floor(Math.random() * 10);
                          console.log(random, "test");
                          dispatch({ type: "random", payload: random });
                        }}
                      >
                        Random
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          let oddNo = countState.count % 2 == 0 ? 1 : 2;
                          console.log(oddNo, "test", countState.count % 2);
                          dispatch({ type: "oddNo", payload: oddNo });
                        }}
                      >
                        Odd Number
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          let oddNo = countState.count % 2 == 0 ? 1 : 2;
                          console.log(oddNo, "test", countState.count % 2);
                          dispatch({
                            type: "decrementByValue",
                            payload: numberInput,
                          });
                        }}
                      >
                        Decrement By User Input
                      </Button>
                    </Grid>
                  </Grid>
                </Box>{" "}
              </Box>
            </Card>
          </Box>
        </>
      )}
    </div>
  );
}
