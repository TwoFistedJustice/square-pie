# Pie Order Fulfillment

This is a subclass of Order Object

# TO DO Pickup Details

- [ ] auto_complete_duration: RFC 3339 #time_date()
- [ ] expires_at: RFC 3339 #time_date()
- [ ] pickup_at: RFC 3339 #time_date()
- [ ] pickup_window_duration: RFC 3339 #time_date()
- [ ] prep_time_duration: RFC 3339 #time_date()
- [ ] is_curbside_pickup: bool
- [ ] note: str 500 #note()
- [ ] cancel_reason: str 100 #note()
- [ ] schedule_type: str fixed ASAP SCHEDULED
- [ ] curbside_pickup_details: {}
- [ ] recipient: {}

<br/>

# TO DO Shipment Details

- [ ] expected_shipped_at: RFC 3339 #time_date()
- [ ] cancel_reason: str 100 #note()
- [ ] failure_reason: str 100 #note()
- [ ] tracking_number: str 100 #note #note()()
- [ ] shipping_note: str 500 #note() #note()
- [ ] tracking_url: str 2000 #note()
- [ ] shipping_type: str 50 #note()
- [ ] carrier: str 50 #note()
- [ ] recipient: {}

<br/>
