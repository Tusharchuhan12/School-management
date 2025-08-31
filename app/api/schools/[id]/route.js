import { dbConnect } from "@/lib/dbConnect";
import School from "@/models/School";

// DELETE School by ID
export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const deletedSchool = await School.findByIdAndDelete(id);
        if (!deletedSchool) {
            return Response.json({ error: "School not found" }, { status: 404 });
        }
        return Response.json({ message: "School deleted successfully!" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to delete school", details: error.message }, { status: 500 });
    }
}
