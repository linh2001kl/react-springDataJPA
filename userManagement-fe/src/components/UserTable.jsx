/** @jsx jsx */
/** @jsxRuntime classic */
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import TextField from "@atlaskit/textfield";

import { css, jsx } from "@emotion/react";

import Button from "@atlaskit/button/new";
import UserService from "../data/UserService";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const boldStyles = css({
  fontWeight: "bold",
});

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "calc(100% - 80px)",
    display: "flex",
    flexDirection: "column",
    marginTop: "0px",
    padding: "0px 0px",
    color: "white",
    backgroundColor: "#282c34",
    "& h1": {
      color: "white",
    },
  },
  contentStyle: {
    display: "flex",
    justifyContent: "center",
    "& button": {
      margin: "10px",
    },
  },
  tableContainer: {
    width: "100%",
    height: "100vh",
    marginTop: "50px",
    marginLeft: "10px",
    marginRight: "10px",
  },

  rowsStyle: {
    fontSize: 20,
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
  },

  searchStyle: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: 20,
    fontWeight: 500,
  },
  tableBody: {
    "& tr:hover": {
      backgroundColor: "gray",
    },
    "& td": {
      borderBottom: "1px solid #E2E2E2 !important",
    },
    "& th": {
      backgroundColor: "gray ",
      color: "white !important",
    },
    "& th h2": {
      color: "white !important",
    },
  },
});

export default function UserTable() {
  const classes = useStyles();

  const [userData, setUserdata] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedSort, setSelectedSort] = useState({
    key: "name",
    sortOrder: "ASC",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const closeEditModal = useCallback(() => setIsEditOpen(false), []);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const openEditModal = useCallback((id) => {
    setSelectedUserId(id);
    console.log(id);
    setIsEditOpen(true);
  }, []);

  const openAddModal = useCallback(() => setIsAddOpen(true), []);
  const closeAddModal = useCallback(() => setIsAddOpen(false), []);

  const handleUpdateData = (userUpdate) => {
    let updateArr = userData.map((e) => {
      if (e.id == userUpdate.id) {
        return userUpdate;
      }
      return e;
    });
    setUserdata(updateArr);
  };

  const handleDeleteUser = (deleteId) => {
    if (window.confirm("Are you sure delete this item?")) {
      let response = UserService.deleteUser(deleteId);
      response.then((res) => {
        let deletedArr = userData.filter((e) => e.id != deleteId);
        setUserdata(deletedArr);
      });
    }
  };

const handleDataFinal = (data) => {
  if (!data || data.length === 0) {
    return [];
  }
  const checkDataType = (val) => (typeof val !== "string" ? "" : val);
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      checkDataType(value).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );
  return [...filteredData].sort((a, b) => {
    if (selectedSort.key) {
      return selectedSort.sortOrder === "ASC"
        ? checkDataType(a?.[selectedSort.key]).localeCompare(
            checkDataType(b?.[selectedSort.key])
          )
        : checkDataType(b?.[selectedSort.key]).localeCompare(
            checkDataType(a?.[selectedSort.key])
          );
    }
    return data;
  });
};

const header = {
  key: "abc",
  cells: [
    {
      key: "stt",
      content: (
        <div className={classes.contentStyle}>
          <h2>#</h2>
        </div>
      ),
      with: 5,
    },
    {
      key: "name",
      content: (
        <div className={classes.contentStyle}>
          <h2>Name</h2>
        </div>
      ),
      with: 15,
    },
    {
      key: "cls",
      content: (
        <div className={classes.contentStyle}>
          <h2>Class</h2>
        </div>
      ),
      with: 15,
    },
    {
      key: "birthDay",
      content: (
        <div className={classes.contentStyle}>
          <h2>Birth Day</h2>
        </div>
      ),
      with: 10,
    },
    {
      key: "email",
      content: (
        <div className={classes.contentStyle}>
          <h2>Email</h2>
        </div>
      ),
      with: 20,
    },
    {
      key: "address",
      content: (
        <div className={classes.contentStyle}>
          <h2>Address</h2>
        </div>
      ),
      with: 20,
    },
    {
      key: "action",
      content: (
        <div className={classes.contentStyle}>
          <h2>Action</h2>
        </div>
      ),
      with: 5,
    },
  ],
};

const dataFinal = handleDataFinal(userData);

const rows = dataFinal.map((data, key) => {
  const datarow = {
    key,
    cells: [
      {
        key: data.id,
        content: (
          <div>
            <div className={classes.rowsStyle}>{data.id}</div>
          </div>
        ),
      },
      {
        key: data.name,
        content: (
          <div>
            <div className={classes.rowsStyle}>{data.name}</div>
          </div>
        ),
      },
      {
        key: data.cls,
        content: (
          <div>
            <div className={classes.rowsStyle}>{data.cls}</div>
          </div>
        ),
      },
      {
        key: data.birthDay,
        content: (
          <div>
            <div className={classes.rowsStyle}>{data.birthDay}</div>
          </div>
        ),
      },
      {
        key: data.email,
        content: (
          <div>
            <div className={classes.rowsStyle}>{data.email}</div>
          </div>
        ),
      },
      {
        key: data.address,
        content: (
          <div>
            <div className={classes.rowsStyle}>{data.address}</div>
          </div>
        ),
      },
      {
        key: data.id,
        content: (
          <div className={classes.rowsStyle}>
            <div className={classes.contentStyle}>
              <Button
                appearance="warning"
                onClick={() => openEditModal(data.id)}
              >
                Edit
              </Button>
              <Button
                appearance="danger"
                onClick={() => handleDeleteUser(data.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ),
      },
    ],
  };
  return datarow;
});

const getAllUser = async () => {
  await UserService.getAllUser()
    .then((res) => {
      setUserdata(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  getAllUser();
}, []);

return (
  <div className={classes.container}>
    <h1 className={classes.contentStyle}>User Management System</h1>
    <div className={classes.tableContainer}>
      <div className={classes.searchStyle}>
        <TextField
          name="keyword"
          isCompact
          width="300"
          autoFocus={false}
          placeholder="Search by name"
          fontSize={16}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <Button appearance="primary" onClick={openAddModal}>
          Add Student
        </Button>
      </div>
      <div className={classes.tableBody}>
        <DynamicTable
          head={header}
          rows={rows}
          rowsPerPage={5}
          defaultPage={1}
          loadingSpinnerSize="large"
        />
      </div>
    </div>
    {/* {isEditOpen && (
        <EditModal
          isOpen={isEditOpen}
          closeModal={closeEditModal}
          userEditInfo={selectedUserData}
          // setUserEditInfo={setUserdata}
        />
      )} */}
    {isAddOpen && (
      <AddModal
        isOpen={isAddOpen}
        closeModal={closeAddModal}
        setUserdata={setUserdata}
      />
    )}
    {isEditOpen && (
      <UpdateModal
        isOpen={isEditOpen}
        closeModal={closeEditModal}
        handleUpdateData={handleUpdateData}
        editID={selectedUserId}
      />
    )}
  </div>
);
  }
