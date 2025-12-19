"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Shield,
  Loader2,
  Award as IdCard,
  User,
  Calendar,
  Hash,
} from "lucide-react"

export default function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://127.0.0.1:8000/uploadfile/", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setResult(data)
    } catch {
      setError("Failed to connect to backend")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-balance">Document Verification System</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Upload Section */}
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Document
                </CardTitle>
                <CardDescription>Upload a document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file ? file.name : "Click to upload"}</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </label>
                </div>

                <Button className="w-full h-11 text-base" onClick={handleUpload} disabled={loading || !file}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Verify Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IdCard className="w-5 h-5 text-primary" />
                  Document Preview
                </CardTitle>
                <CardDescription>{file ? "Document ready for verification" : "No document uploaded"}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center min-h-[280px]">
                {file ? (
                  <div className="w-full">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt="Uploaded Document"
                      className="max-w-full h-auto rounded-lg shadow-lg border-2 border-border"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
                      <IdCard className="w-10 h-10 opacity-50" />
                    </div>
                    <p className="text-sm">No document uploaded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8 border-2">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Status Banner */}
              <Card
                className={`border-2 ${
                  result.final_status === "PASS"
                    ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
                    : "border-red-500/50 bg-red-50/50 dark:bg-red-950/20"
                }`}
              >
                <CardContent className="py-8">
                  <div className="flex flex-col items-center gap-4">
                    {result.final_status === "PASS" ? (
                      <>
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-500" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-green-700 dark:text-green-500 mb-1">
                            Verification Successful
                          </h3>
                          <p className="text-sm text-muted-foreground">All validation checks passed</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                          <XCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-red-700 dark:text-red-500 mb-1">
                            Verification Failed
                          </h3>
                          <p className="text-sm text-muted-foreground">Document did not pass validation checks</p>
                        </div>
                        <Badge variant="destructive" className="px-4 py-1 text-sm">
                          NOT VERIFIED
                        </Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Document Information */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5 text-primary" />
                      Document Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <IdCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Document Type</p>
                        <p className="font-semibold">{result.document_type}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Validation Checks */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-primary" />
                      Validation Checks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ValidationItem icon={Hash} label="Document Number" valid={result.validations.doc_num_valid} />
                    <ValidationItem icon={User} label="Name Present" valid={result.validations.name_present} />
                    <ValidationItem icon={Calendar} label="DOB Present" valid={result.validations.dob_present} />
                    {"gender_present" in result.validations && (
                      <ValidationItem icon={User} label="Gender Present" valid={result.validations.gender_present} />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Extracted Text */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Extracted Text
                  </CardTitle>
                  <CardDescription>Raw text extracted from the document using OCR</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                    <ul className="space-y-2">
                      {result.extracted_text.map((text, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-muted-foreground mt-1">•</span>
                          <span className="flex-1">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ValidationItem({ icon: Icon, label, valid }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="flex-1 text-sm">{label}</span>
      {valid ? (
        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600 dark:text-red-500" />
      )}
    </div>
  )
}
