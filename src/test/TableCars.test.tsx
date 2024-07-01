// // TableCars.test.tsx

// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import TableCars from "../components/cards/tableCars";

// // Mock the axios instance
// const mock = new MockAdapter(axios);

// describe("TableCars", () => {
//   afterEach(() => {
//     mock.reset();
//   });

//   test("fetches and displays cars", async () => {
//     // Mock the API response
//     mock.onGet("http://localhost:8000/api/cars").reply(200, {
//       cars: [
//         {
//           id: 1,
//           name: "Car 1",
//           price: 100,
//           start_rent: "2023-01-01T00:00:00Z",
//           finish_rent: "2023-01-10T00:00:00Z",
//           availability: true,
//           created_at: "2023-01-01T00:00:00Z",
//           updated_at: "2023-01-01T00:00:00Z",
//           deleted_by: null,
//         },
//         {
//           id: 2,
//           name: "Car 2",
//           price: 200,
//           start_rent: "2023-02-01T00:00:00Z",
//           finish_rent: "2023-02-10T00:00:00Z",
//           availability: false,
//           created_at: "2023-02-01T00:00:00Z",
//           updated_at: "2023-02-01T00:00:00Z",
//           deleted_by: null,
//         },
//       ],
//     });

//     // Render the component
//     render(<TableCars />);

//     // Wait for the cars to be displayed
//     await waitFor(() => {
//       expect(screen.getByText("Car 1")).toBeInTheDocument();
//       expect(screen.getByText("Car 2")).toBeInTheDocument();
//     });

//     // Check if other details are displayed
//     expect(screen.getByText("100")).toBeInTheDocument();
//     expect(screen.getByText("200")).toBeInTheDocument();
//     expect(screen.getByText("Available")).toBeInTheDocument();
//     expect(screen.getByText("Not Available")).toBeInTheDocument();
//   });
// });
