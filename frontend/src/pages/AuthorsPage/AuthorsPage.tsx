import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import ProtectedRoute from "@/layouts/ProtectedRoute/ProtectedRoute"
import { Author } from "@/models"
import { requestService } from "@/services"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CardBody, Card, CardTitle, Button } from "reactstrap"

function AuthorsPage() {
  const requests = requestService()
  const navigator = useNavigate()

  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    requests.getAuthors().then((response: Author[]) => {
      setAuthors(response)
    })
  }, [])

  async function goToEditPageHandler(authorId: number) {
    navigator(`/edit/author/${authorId}/`)
  }

  async function deleteHandler(authorId: number) {  
    requests.deleteAuthor(authorId)
    requests.getAuthors().then((response: Author[]) => {
      setAuthors(response)
    })
  }

  return (
    <>
      <ProtectedRoute>
        <BaseLayout>
        { authors.map((author: Author) => (
          <div className="py-1">
            <Card 
              color="dark" 
              style={{color: "#fff"}}
              key={author.id}
            >
              <CardBody className="d-flex justify-content-between">
                <CardTitle tag="h5">
                  {author.name}
                </CardTitle>
                <div className="buttons__wrapper">
                  <Button color="primary" onClick={() => {goToEditPageHandler(author.id)}}>
                    Edit
                  </Button>
                  <Button 
                    color="danger" 
                    style={{marginLeft: "10px"}}
                    onClick={() => {deleteHandler(author.id)}}
                  >
                    Delete
                  </Button>
                </div>
              </CardBody> 
            </Card>
          </div>
        ))
        }
        </BaseLayout>
      </ProtectedRoute>
    </>
  )
}

export default AuthorsPage