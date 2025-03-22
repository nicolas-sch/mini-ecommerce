"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import styles from "./Login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const mockUser = {
    email: "carlos_demo@cecote.es",
    password: "12345",
    username: "carlosperez",
    firstName: "Carlos",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === mockUser.email && password === mockUser.password) {
      login({
        username: mockUser.username,
        firstName: mockUser.firstName,
        email: mockUser.email,
      });

      router.push("/");

      toast.success("¡Inicia sesión exitosamente!");
    } else {
      toast.error("Correo electrónico o contraseña incorrectos.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Card className={styles.formContainer}>
          <CardHeader>
            <div className={styles.imageLogo}>
              <Image
                src="/LogoCecotec.png"
                alt="Logo"
                width={136}
                height={24}
                className="object-contain"
              />
            </div>
            <CardTitle className={styles.formTitle}>
              Iniciar sesión o crear cuenta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className={styles.formLabel}>
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.formInput}
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="password" className={styles.formLabel}>
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.formInput}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Button type="submit" className={styles.formButton}>
                  Acceder
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-left mt-6">
            <Link href="/" className={styles.linkHome}>
              <span>Ir a la home</span>
              <span className="ml-2">➔</span>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className={styles.rightSide}>
        <Image
          src="/_MainImage.png"
          alt="Imagen de fondo"
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
    </div>
  );
}
