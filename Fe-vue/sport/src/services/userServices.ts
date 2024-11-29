import { ref } from "vue";
import EventEmitter from "eventemitter3"; // Use the third-party library
import User from "@/data/User.model";
import { stringify } from "querystring";
const eventEmitter = new EventEmitter();
const isLoggedIn = ref(false);
const userService = {
  eventEmitter,
  getUsers(): User[] {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  },

  saveUsers(users: User): void {
    localStorage.setItem("users", JSON.stringify(users));
  },

  login(user: User): User {
    this.setLoggedInUser(user);
    eventEmitter.emit("userLoggedIn", user);
    isLoggedIn.value = true;
    return user;
  },

  isLoggedIn(): boolean {
    const user = localStorage.getItem("currentUser");
    return user ? true : false;
  },

  getUser(): User {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },

  setLoggedInUser(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  logout(): void {
    localStorage.removeItem("currentUser");
    eventEmitter.emit("userLoggedOut");
    isLoggedIn.value = false;
  },
};

export default userService;
