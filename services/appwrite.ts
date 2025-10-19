import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listRows(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("searchTerm", query)]
        );

        if (result?.total > 0) {
            const existingMovie = result?.rows[0];
            await database.updateRow({
                databaseId: DATABASE_ID,
                tableId: COLLECTION_ID,
                rowId: existingMovie.$id,
                data: {
                    count: (existingMovie.count || 0) + 1,
                },
            });
            console.log("updated")
        } else {
            await database.createRow({
                databaseId: DATABASE_ID,
                tableId: COLLECTION_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    count: 1,
                },
            });
            console.log("created")
        }
    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listRows(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc('count')
            ]
        );
        return result.rows as unknown as TrendingMovie[]
    } catch (error) {
        console.log(error)
        return undefined
    }
}