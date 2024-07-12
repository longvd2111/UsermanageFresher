import React, { useCallback, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditNew from "./ModalEditNew";
import _, { debounce } from "lodash";
import ModalConfirm from "./ModalConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faCirclePlus,
  faFileArrowDown,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import "./Table.scss";
import { CSVLink, CSVDownload } from "react-csv";
import PaPa from "papaparse";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("");
  const [sortField, setSortField] = useState("id");

  const [keyWord, setKeyWord] = useState("");
  const [dataExport, setDataExport] = useState("");

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    let index = listUsers.findIndex((item) => (item.id = user.id));
    let clonelistUsers = _.cloneDeep(listUsers);
    clonelistUsers[index].first_name = user.first_name;
    setListUsers(clonelistUsers);
  };

  const handleDeleteUserFromModal = (user) => {
    let clonelistUsers = _.cloneDeep(listUsers);
    clonelistUsers = clonelistUsers.filter((item) => item.id !== user.id);
    setListUsers(clonelistUsers);
  };

  useEffect(() => {
    //call api
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
    setIsShowModalDelete(true);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let clonelistUsers = _.cloneDeep(listUsers);
    clonelistUsers = _.orderBy(clonelistUsers, [sortField], [sortBy]);
    setListUsers(clonelistUsers);
  };

  const handleSearch = (event) => {
    let term = event.target.value;
    debouncedSearch(term);
  };

  const debouncedSearch = useCallback(
    _.debounce((term) => {
      if (term) {
        let clonedListUsers = _.cloneDeep(listUsers);
        clonedListUsers = clonedListUsers.filter((item) =>
          item.email.includes(term)
        );
        setListUsers(clonedListUsers);
      } else {
        getUsers(1);
      }
    }, 300),
    [listUsers]
  );

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file...");
        return;
      }
      console.log(file);
      PaPa.parse(file, {
        // header: true,
        skipEmptyLines: true,
        complete: function (results) {
          let rawCSV = results.data;

          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format Header CSV file!");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setListUsers(result);
              }
            } else {
              toast.error("Wrong format CSV file!");
            }
          } else {
            toast.error("Not found data on CSV file!");
          }
          console.log("Finished:", results.data);
        },
      });
    }
    // Parse local CSV file
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <h3>List Users:</h3>
        </span>
        <div className="group-btns">
          <label htmlFor="import" className="btn btn-warning">
            <FontAwesomeIcon icon={faFileImport} />
            &nbsp;Import
          </label>
          <input
            type="file"
            id="import"
            onChange={(event) => handleImportCSV(event)}
            hidden
          ></input>
          <CSVLink
            data={dataExport}
            filename={"user.csv"}
            asyncOnClick={true}
            onClick={getUsersExport}
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faFileArrowDown} />
            &nbsp;Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            &nbsp;Add new
          </button>
        </div>
      </div>

      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Search by email...."
          // value={keyWord}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i onClick={() => handleSort("asc", "id")}>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </i>
                  <i onClick={() => handleSort("desc", "id")}>
                    <FontAwesomeIcon icon={faArrowDown} />
                  </i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i onClick={() => handleSort("asc", "first_name")}>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </i>
                  <i onClick={() => handleSort("desc", "first_name")}>
                    <FontAwesomeIcon icon={faArrowDown} />
                  </i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={2}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        activeLinkClassName="active"
      />

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditNew
        show={isShowModalEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
        dataUserEdit={dataUserEdit}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
        dataUserDelete={dataUserDelete}
      />
    </>
  );
};

export default TableUsers;
