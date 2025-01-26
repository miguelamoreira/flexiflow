import { gql } from '@apollo/client/core';
import apiClient from './apiClient';

export const GET_DAILY_CHALLENGE = gql`
    query GetDailyChallenge {
        dailyChallenge {
            id
            date
            exercises {
                id
                name
                description
                image
            }
            points
            users {
                id
                name
            }
        }
    }
`

export const CREATE_DAILY_CHALLENGE = gql`
    mutation CreateDailyChallenge($date: String!, $points: Int!) {
        createDailyChallenge(date: $date, points: $points) {
            id
            date
            exercises {
                id
                name
                description
            }
            points
            users {
                id
                name
            }
        }
    }
`

export const COMPLETE_DAILY_CHALLENGE = gql`
    mutation CompleteDailyChallenge($userId: ID!) {
        completeDailyChallenge(userId: $userId) {
            user {
                id
                name
                total_points
            }
            dailyChallenge {
                id
                date
                points
            }
        }
    }
`

export const DAILY_CHALLENGE_CREATED = gql`
    subscription DailyChallengeCreated {
        dailyChallengeCreated {
            id
            date
            exercises {
                id
                name
            }
            points
        }
    }
`

export const fetchDailyChallenge = async () => {
    const { data } = await apiClient.query({ query: GET_DAILY_CHALLENGE })
    return data.dailyChallenge
}

export const createDailyChallenge = async (date: string, points: number) => {
    const { data } = await apiClient.mutate({
        mutation: CREATE_DAILY_CHALLENGE,
        variables: { date, points }
    })
    return data.createDailyChallenge
}

export const completeDailyChallenge = async (userId: number) => {
    const { data } = await apiClient.mutate({
        mutation: COMPLETE_DAILY_CHALLENGE,
        variables: { userId }
    })
    return data.completeDailyChallenge
}