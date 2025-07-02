import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  Search, 
  RefreshCw,
  Download,
  Users,
  ArrowUpDown,
  SortAsc,
  SortDesc,
  Eye,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  FileCheck,
  FileText,
  AlertTriangle,
  Building2,
  Calendar,
  DollarSign,
  Plane,
  Globe
} from 'lucide-react'

interface VisaStickerRecord {
  id: string
  employeeName: string
  empId: string
  passportNumber: string
  nationality: string
  department: string
  designation: string
  visaType: 'work' | 'business' | 'tourist' | 'residence' | 'multiple-entry'
  visaNumber: string
  applicationDate: string
  issueDate?: string
  expiryDate?: string
  validityPeriod: string
  stickerNumber: string
  embassyConsulate: string
  processingLocation: 'male' | 'home-country' | 'third-country'
  status: 'applied' | 'processing' | 'approved' | 'issued' | 'rejected' | 'expired' | 'cancelled'
  applicationFee: number
  stickerFee: number
  courierFee: number
  serviceFee: number
  totalFees: number
  passportSubmissionDate?: string
  passportCollectionDate?: string
  courierTrackingNumber?: string
  rejectionReason?: string
  entryPermissions: {
    singleEntry: boolean
    multipleEntry: boolean
    maxStayDays: number
  }
  documents: string[]
  notes?: string
  createdAt: string
  updatedAt: string
}

export function VisaSticker() {
  const [visaStickers] = useState<VisaStickerRecord[]>([
    {
      id: '1',
      employeeName: 'Rajesh Kumar',
      empId: 'EMP001',
      passportNumber: 'A1234567',
      nationality: 'Indian',
      department: 'Construction',
      designation: 'Construction Worker',
      visaType: 'work',
      visaNumber: 'MV2024001234',
      applicationDate: '2024-11-01',
      issueDate: '2024-11-25',
      expiryDate: '2025-11-25',
      validityPeriod: '1 Year',
      stickerNumber: 'STK-2024-001',
      embassyConsulate: 'Maldivian Embassy - New Delhi',
      processingLocation: 'home-country',
      status: 'issued',
      applicationFee: 1000,
      stickerFee: 500,
      courierFee: 300,
      serviceFee: 200,
      totalFees: 2000,
      passportSubmissionDate: '2024-11-05',
      passportCollectionDate: '2024-11-27',
      courierTrackingNumber: 'DHL-123456789',
      entryPermissions: {
        singleEntry: false,
        multipleEntry: true,
        maxStayDays: 365
      },
      documents: ['passport_copy.pdf', 'work_permit.pdf', 'employment_letter.pdf'],
      notes: 'Multiple entry work visa issued successfully',
      createdAt: '2024-10-28',
      updatedAt: '2024-11-27'
    },
    {
      id: '2',
      employeeName: 'Mohammad Rahman',
      empId: 'EMP002',
      passportNumber: 'B9876543',
      nationality: 'Bangladeshi',
      department: 'Electrical',
      designation: 'Senior Electrician',
      visaType: 'work',
      visaNumber: 'MV2024002345',
      applicationDate: '2024-10-20',
      issueDate: '2024-11-15',
      expiryDate: '2025-11-15',
      validityPeriod: '1 Year',
      stickerNumber: 'STK-2024-002',
      embassyConsulate: 'Maldivian Embassy - Dhaka',
      processingLocation: 'home-country',
      status: 'issued',
      applicationFee: 1000,
      stickerFee: 500,
      courierFee: 250,
      serviceFee: 150,
      totalFees: 1900,
      passportSubmissionDate: '2024-10-25',
      passportCollectionDate: '2024-11-18',
      courierTrackingNumber: 'FedEx-987654321',
      entryPermissions: {
        singleEntry: false,
        multipleEntry: true,
        maxStayDays: 365
      },
      documents: ['passport_copy.pdf', 'work_permit.pdf', 'medical_certificate.pdf'],
      createdAt: '2024-10-15',
      updatedAt: '2024-11-18'
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredStickers = useMemo(() => {
    return visaStickers.filter(sticker => {
      const matchesSearch = sticker.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sticker.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sticker.visaNumber.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || sticker.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [visaStickers, searchQuery, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'processing': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
      case 'approved': return 'bg-green-500/10 text-green-700 border-green-200'
      case 'issued': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'rejected': return 'bg-red-500/10 text-red-700 border-red-200'
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200'
    }
  }

  const formatCurrency = (amount: number) => {
    return `MVR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">VISA Sticker Management</h1>
          <p className="text-muted-foreground">
            Manage visa sticker applications and tracking • {filteredStickers.length} sticker{filteredStickers.length !== 1 ? 's' : ''} shown
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visaStickers.length}</div>
            <p className="text-xs text-muted-foreground">All visa applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issued</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {visaStickers.filter(v => v.status === 'issued').length}
            </div>
            <p className="text-xs text-muted-foreground">Active visas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {visaStickers.filter(v => v.status === 'processing').length}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(visaStickers.reduce((sum, v) => sum + v.totalFees, 0))}
            </div>
            <p className="text-xs text-muted-foreground">Total processing costs</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search visa stickers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="issued">Issued</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Visa Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Embassy</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total Fees</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStickers.map((sticker) => (
              <TableRow key={sticker.id} className="hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{sticker.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{sticker.employeeName}</div>
                      <div className="text-sm text-muted-foreground">
                        {sticker.empId} • {sticker.nationality}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{sticker.visaNumber}</code>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{sticker.visaType}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{sticker.embassyConsulate}</TableCell>
                <TableCell>{new Date(sticker.applicationDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {sticker.expiryDate ? (
                    <div className={
                      new Date(sticker.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
                        ? 'text-red-600 font-medium' 
                        : ''
                    }>
                      {new Date(sticker.expiryDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Pending</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(sticker.status)}>
                    {sticker.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(sticker.totalFees)}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}