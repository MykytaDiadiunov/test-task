import { Author } from "@/models"
import { requestService } from "@/services"
import { ChangeEvent, useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

interface BookFilterProps {
  filterChange: (selectedAuthorIds: number[]) => void
}

function BookFilter({ filterChange }: BookFilterProps) {
  const requests = requestService()

  const [authors, setAuthors] = useState<Author[]>([])
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>([])     

  useEffect(() => {
    requests.getAuthors().then((response: Author[]) => {
      setAuthors(response)
    }) 
  }, [])

  function checkboxChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value, 10)
    const isChecked = event.target.checked

    setSelectedAuthorIds((prev) =>
      isChecked
        ? [...prev, value]
        : prev.filter((val) => val !== value)
    )
  }

  function applyFilterHandler() {
    filterChange(selectedAuthorIds)
  }

  function clearFilterHandler() {
    filterChange([])
    setSelectedAuthorIds([])
  }

  return (
    <>
      <Form className="p-3 rounded-2" style={{ backgroundColor: "rgb(33, 37, 41)" }}>
        <FormGroup check>
          {authors.map((author: Author) => (
            <div className="checkbox__wrapper mb-2" key={author.id}>
              <Label for={author.id.toString()} check>{author.name}</Label>
              <Input 
                id={author.id.toString()}
                type="checkbox" 
                value={author.id}
                checked={selectedAuthorIds.includes(author.id)}
                onChange={checkboxChangeHandler}
              />
            </div>
          ))}
        </FormGroup>
        <Button onClick={applyFilterHandler} className="w-100 mt-2">
          Apply
        </Button>
        <Button 
          onClick={clearFilterHandler} 
          className="w-100 mt-2"
          color="danger"
        >
          Clear Filter
        </Button>
      </Form>
    </>
  )
}

export default BookFilter