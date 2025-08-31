import { dbConnect } from "@/lib/dbConnect";
import School from "@/models/School";

export async function GET() {
    await dbConnect();
    const schools = await School.find();
    return Response.json(schools);
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const newSchool = await School.create(body);
        return Response.json({ message: "School added successfully!", school: newSchool }, { status: 201 });
    } catch (error) {
        return Response.json({ error: "Failed to add school", details: error.message }, { status: 400 });
    }
}
