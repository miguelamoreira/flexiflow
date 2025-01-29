import { fetchDailyChallenge, createDailyChallenge, completeDailyChallenge, subscribeToDailyChallenge } from "@/api/dailyChallengeApi";
import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";

export interface Exercise {
    id: string;
    name: string;
    description: string;
    category_id: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    total_points: number;
    categories_completed: string
}

export interface DailyChallenge {
    id: string;
    date: string;
    exercise: Exercise | null;
    points: number;
    users: string[];
}

interface DailyChallengeState {
    dailyChallenge: DailyChallenge | null;
    loading: boolean;
    error: string | null;
}

export const useDailyChallengeStore = defineStore('dailyChallenge', {
    state: (): DailyChallengeState => ({
        dailyChallenge: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchDailyChallenge() {
            this.loading = true
            this.error = null

            try {
                const dailyChallenge = await fetchDailyChallenge()
                this.dailyChallenge = dailyChallenge
                console.log('already created: ', this.dailyChallenge);
                
            } catch (error) {
                this.error = "Failed to fetch daily challenge"
                console.error("Error fetching daily challenge: ", error)
            } finally {
                this.loading = false
            }
        },
        async createDailyChallenge(date: string, points: number) {
            this.loading = true
            this.error = null

            try {
                const newChallenge = await createDailyChallenge(date, points)

                this.dailyChallenge = newChallenge
                console.log('created: ', this.dailyChallenge);
                
            } catch (error) {
                this.error = "Failed to create daily challenge"
                console.error("Error creating daily challenge: ", error)
            } finally {
                this.loading = false
            }
        },
        async completeDailyChallenge(userId: number) {
            this.loading = true
            this.error = null

            try {
                await completeDailyChallenge(userId)
                if (this.dailyChallenge) {
                    this.dailyChallenge.users.push(userId.toString())
                }
            } catch (error) {
                this.error = "Failed to complete daily challenge"
                console.error("Error completing daily challenge: ", error)
            } finally {
                this.loading = false
            }
        },
        showChallengeToast(challenge: DailyChallenge) {
            const toast = useToast();
            if (challenge) {
                toast.info(`A new daily challenge is available!`);
            }
        },
        subscribeToDailyChallenge() {
            const subscription = subscribeToDailyChallenge((newChallenge: DailyChallenge) => {
                
                this.dailyChallenge = newChallenge;
                console.log('CHALLENGE CREATED:', newChallenge);

                this.showChallengeToast(newChallenge);
            });
        }
    }
})