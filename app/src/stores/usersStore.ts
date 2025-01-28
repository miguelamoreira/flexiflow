import { defineStore } from "pinia";
import { fetchUsers, fetchUser, createUser, login, completeCategory } from "@/api/usersApi";

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    total_points: number;
    categories_completed: string
}

interface UsersState {
    users: User[];
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const useUsersStore = defineStore('users', {
    state: (): UsersState => ({
        users: [],
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: null
    }),
    actions: {
        async createUser(name: string, email: string, password: string) {
            this.loading = true
            this.error = null
            try {
                const newUser = await createUser(name, email, password)
                this.login(email,password)
            } catch (error) {
                this.error = "Failed to create new user"
                console.error("Error creating user: ", error)
            } finally {
                this.loading = false
            }
        },
        async login(email: string, password: string) {
            this.loading = true
            this.error = null
            try {
                const token = await login(email, password)
                this.token = token
                this.isAuthenticated = true
                await this.fetchLoggedInUser()
            } catch (error) {
                this.error = "Failed to login"
                console.error("Error logging in: ", error)
            } finally {
                this.loading = false
            }
        },
        async fetchLoggedInUser() {
            if (!this.token) {
                return
            }

            this.loading = true
            this.error = null

            try {
                const userId = this.parseTokenForUserId(this.token);
                const user = await fetchUser(Number(userId))
                this.user = user
            } catch (error) {
                this.error = "Failed to fetch logged in user"
                console.error("Error fetching logged in user: ", error)
            } finally {
                this.loading = false
            }
        },
        parseTokenForUserId(token: string): string | null {
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              return payload?.userId || null;
            } catch (error) {
              console.error("Error decoding token: ", error);
              return null;
            }
        },
        logout() {
            this.user = null
            this.isAuthenticated = false
            this.token = null
        },
        async completeCategory(userId: string, categoryId: string) {
            this.loading = true;
            this.error = null;
      
            try {
              const updatedUser = await completeCategory(userId, categoryId);
              if(this.user){
                const newUser = {...this.user}
                newUser.categories_completed = updatedUser.categories_completed
                newUser.total_points = updatedUser.total_points
                this.user = newUser
              }
            } catch (error) {
              this.error = 'Failed to complete category';
              console.error('Error completing category: ', error);
            } finally {
              this.loading = false;
            }
          }
      
    },
    getters: {
        getUserById: (state) => (id: string) => state.users.find((user) => user.id === id),
        isLoggedIn: (state) => state.isAuthenticated
    }
})