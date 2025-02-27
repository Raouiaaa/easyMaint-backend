import prisma from "../config/db.js";

// test getting all work orders 
export const testWorkOrder = async (req, res) => {
  try {
      res.json({ workOrders: testWorkOrders });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


const testWorkOrders = [
    {
      "id_work_order": 1,
      "FK_id_asset": 101,
      "FK_id_user": 201,
      "status": "overdue",
      "start_date": "2025-10-26T08:00:00Z",
      "end_date": "",
      "created_at": "2025-10-26T08:00:00Z",
    },
    {
      "id_work_order": 2,
      "FK_id_asset": 102,
      "FK_id_user": 202,
      "status": "open",
      "start_date": "2025-10-26T14:30:00Z",
      "end_date": "",
      "created_at": "2025-10-26T14:30:00Z",
    },
    {
      "id_work_order": 3,
      "FK_id_asset": 103,
      "FK_id_user": 203,
      "status": "open",
      "start_date": "2025-10-26T14:00:00Z",
      "end_date": "",
      "created_at": "2025-10-26T14:00:00Z",
    },
    {
      "id_work_order": 4,
      "FK_id_asset": 104,
      "FK_id_user": 204,
      "status": "done",
      "start_date": "2025-10-26T09:00:00Z",
      "end_date": "2025-10-26T10:00:00Z",
      "created_at": "2025-10-26T09:00:00Z",
    },
    {
      "id_work_order": 5,
      "FK_id_asset": 105,
      "FK_id_user": 205,
      "status": "done",
      "start_date": "2025-10-26T07:00:00Z",
      "end_date": "2025-10-26T08:30:00Z",
      "created_at": "2025-10-26T07:00:00Z",
    },
];

