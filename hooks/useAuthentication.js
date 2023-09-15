import React, { useMemo, useState, useEffect } from "react";
import { useToast } from "native-base";
import ToastAlert from "../components/ToastAlert";
import { getTable } from "../configs/firebaseConfig";
import { onValue } from "firebase/database";
import { setData } from "../utils/localStorage";

export default function useAuthentication(navigation) {
  const toast = useToast();

  const [form, setForm] = useState({
    nim: "",
    nik: "",
    password: "",
  });

  const [isLoading, setIsloading] = useState(false);
  const [isConsular, setIsConsular] = useState(false);
  const [consular, setConsular] = useState([]);
  const [students, setStudents] = useState([]);

  const getData = () => {
    onValue(getTable("students"), (snapshot) => {
      const data = snapshot.val();
      setStudents(data);
    });

    onValue(getTable("consular"), (snapshot) => {
      const data = snapshot.val();
      setConsular(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const checkLogin = async () => {
    if (isConsular) {
      const findUser = consular.find(
        (item) => item.nik === form.nik && item.password === form.password
      );
      const isHaveUserData = findUser ? true : false;
      if (isHaveUserData) {
        await setData("user", findUser);
      }
      return isHaveUserData;
    } else {
      const findUser = students.find(
        (item) => item.nim === form.nim && item.password === form.password
      );
      const isHaveUserData = findUser ? true : false;
      if (isHaveUserData) {
        await setData("user", findUser);
      }
      return isHaveUserData;
    }
  };

  const onChangeInput = (key) => (value) =>
    setForm((prevState) => ({ ...prevState, [`${key}`]: value }));

  const onLogin = async () => {
    setIsloading(true);

    const isLogin = await checkLogin();

    if (isLogin) {
      navigation.replace("Home");
      setIsloading(false);
    } else {
      const item = {
        title: "Gagal Login",
        variant: "left-accent",
        description: "pastikan nim dan password anda sudah benar!",
        isClosable: true,
        toast: toast,
      };
      toast.show({
        render: ({ id }) => {
          return <ToastAlert id={id} {...item} />;
        },
      });
      setIsloading(false);
    }
  };

  const isDisableButton = useMemo(() => {
    if (isConsular) {
      if (!form.nik.trim() || !form.password.trim()) {
        return true;
      } else {
        return false;
      }
    } else {
      if (!form.nim.trim() || !form.password.trim()) {
        return true;
      } else {
        return false;
      }
    }
  }, [form]);

  const resetForm = () => {
    setForm({
      nim: "",
      nik: "",
      password: "",
    });
  };

  return {
    form,
    isLoading,
    onChangeInput,
    onLogin,
    isDisableButton,
    isConsular,
    setIsConsular,
    resetForm,
  };
}
