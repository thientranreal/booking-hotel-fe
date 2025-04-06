"use client";

import { currentUser, userUpdate } from "@/app/api/user";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Account() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "confirmPass") {
      setConfirmPass(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password && confirmPass !== formData.password) {
      toast.warn("Mật khẩu xác nhận không đúng");
      return;
    }
    setLoading(true);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await currentUser();

      if (data && data.user) {
        setFormData({
          ...formData,
          name: data.user.name,
          phone: data.user.phone,
          email: data.user.email,
        });

        setUserId(data.user.id);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    if (loading) {
      const updateUserInfo = async () => {
        const res = await userUpdate(userId, formData);
        // console.log("update user", res);

        if (res.errors) {
          toast.error(res.errors[0].message);
        } else if (res.message === "Updated successfully.") {
          toast.success("Cập nhập thông tin thành công !");
          setFormData({ ...formData, password: "" });
          setConfirmPass("");
        }

        setLoading(false);
      };

      updateUserInfo();
    }
  }, [loading]);

  return (
    <Box maxWidth={500} mx="auto" p={3}>
      <Typography variant="h5" mb={2}>
        Cập nhật thông tin cá nhân
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            label="Họ tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            required
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
          />

          <TextField
            label="Mật khẩu mới"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            fullWidth
            placeholder="Để trống nếu không đổi"
          />

          <TextField
            label="Nhập lại mật khẩu"
            name="confirmPass"
            value={confirmPass}
            onChange={handleChange}
            type="password"
            fullWidth
            placeholder="Nhập lại mật khẩu"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
