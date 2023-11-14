import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader";
import { format } from "timeago.js";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import { style } from "@/app/styles/style";
import { toast } from "react-toastify";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
const [updateUserRole,{isSuccess,error:roleError}] = useUpdateUserRoleMutation();
const [deleteUser, {isSuccess:deleteSuccess,error:deleteUserError}] = useDeleteUserMutation({});
  const { isLoading, data,refetch } = useGetAllUsersQuery({},{refetchOnMountOrArgChange:true});

  useEffect(() => {
    if(isSuccess){
        refetch();
        toast.success("User role updated successfully");
        setActive(false);
    }
    if(roleError){
     if("data" in roleError){
        const errorMessage = roleError as any;
        toast.error(errorMessage.data.message);
     }
    }
    if(deleteSuccess){
        refetch();
        toast.success("User delete successfully");
        setOpen(false);
    }
    if(deleteUserError){
        if("data" in deleteUserError){
           const errorMessage = deleteUserError as any;
           toast.error(errorMessage.data.message);
        }
       }
  },[isSuccess,roleError,deleteSuccess, deleteUserError,refetch])

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "createdAt", headerName: "Joined At", flex: 0.4 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => {setOpen(!open); setUserId(params.row.id)}}>
              <AiOutlineDelete
                size={20}
                className={" dark:text-white text-black"}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Send-mail",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail
                size={20}
                className={" dark:text-white text-black"}
              />
            </a>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  if (isTeam) {
    const admins =
      data && data.users.filter((item: any) => item.role === "admin");

    admins &&
      admins.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  }
   const handleSubmit = async() => {
    await updateUserRole({email,role});
 }
 const handleDeleteUser = async() => {
    const id = userId;
    await deleteUser(id);
 }
 
  return (
    <div className="mt-[120px] ml-7">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`${style.button} !w-[250px]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className=" absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={style.title}>Add new Member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Enter Email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={style.input}
                  />
                  <br />
                  <br />
                  <p className={style.label}>Select the Role</p>
                  <select name="" id="" className={style.input} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin" className=" dark:bg-[#2b2323] bg-white">Admin</option>
                    <option value="user" className=" dark:bg-[#2b2323] bg-white">User</option>
                  </select>
                  <br />
                  <div className={`${style.button}`} onClick={() => handleSubmit()}>Submit</div>
                </div>
              </Box>
            </Modal>
          )}
          {
            open && (
                <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className=" absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={style.title}>Are you sure you want to delete this user?</h1>
                    <div className=" mt-4 mb-6 flex w-full justify-around items-center">
                        <div className={`${style.button} !w-[120px] !bg-[#62cb5b]`} onClick={() => setOpen(!open)}>Cancel</div>
                        <div className={`${style.button} !w-[120px] !bg-[#e34141]`} onClick={() => handleDeleteUser()}>Delete</div>
                    </div>
                </Box>
              </Modal>
            )
          }
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
