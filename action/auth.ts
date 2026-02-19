"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// 1. Importamos la data estática
import { usuariosFake } from "@/lib/mockData";

export async function login(formData: FormData) {
  const usuarioInput = formData.get("usuario") as string;
  const passwordInput = formData.get("password") as string;

  // 2. Buscamos el usuario en el array estático en lugar de la DB
  const user = usuariosFake.find(
    (u) => u.usuario === usuarioInput && u.password === passwordInput
  );

  // 3. Si no existe el usuario o la contraseña no coincide
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // 4. Guardamos la sesión en cookies
  const cookieStore = await cookies();
  cookieStore.set("user_role", user.rol);
  cookieStore.set("user_name", user.nombre);

  // 5. Redirección basada en el Rol
  if (user.rol === "OPERATIVO") {
    redirect("/dashboard/gestion");
  } else {
    redirect("/dashboard/registrar");
  }
}