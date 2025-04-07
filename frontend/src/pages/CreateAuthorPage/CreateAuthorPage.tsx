import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import ProtectedRoute from "@/layouts/ProtectedRoute/ProtectedRoute"

function CreateAuthorPage() {

  return (
    <>
      <ProtectedRoute>
        <BaseLayout>
          <h1>Soo</h1>
        </BaseLayout>
      </ProtectedRoute>
    </>
  )
}

export default CreateAuthorPage