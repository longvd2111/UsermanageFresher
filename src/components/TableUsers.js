import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditNew from "./ModalEditNew";
import _ from "lodash";
import ModalConfirm from "./ModalConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./Table.scss";

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
    clonelistUsers.sort((a, b) => a[sortField] - b[sortField]);
    clonelistUsers = _.orderBy(clonelistUsers, [sortField], [sortBy]);
    setListUsers(clonelistUsers);
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <h3>List Users:</h3>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add new user
        </button>
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
