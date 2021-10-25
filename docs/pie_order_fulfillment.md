# Pie Order Fulfillment

This is a subclass of Order Object

I reserve the right to dump everything back into the order object if I darn well please.

# TO DO Pickup Details

- [x] cancel_reason: str 100 #note()
- [x] auto_complete_duration: RFC 3339 #time_date()
- [x] expires_at: RFC 3339 #time_date()
- [x] pickup_at: RFC 3339 #time_date()
- [x] pickup_window_duration: RFC 3339 #time_date()
- [x] prep_time_duration: RFC 3339 #time_date()
- [x] note: str 500 #note()
- [x] asap - schedule_type: ASAP
- [x] scheduled- schedule_type: SCHEDULED
- [x] clear_curbside_pickup: set is_curbside_pickup to false
- [ ] curbside_pickup_details: {} - have it set is_curbside_pickup to true
- [ ] recipient: {}
- [ ] add()

<br/>

# TO DO Shipment Details

- [x] cancel_reason: str 100 #note()
- [x] expected_shipped_at: RFC 3339 #time_date()
- [x] failure_reason: str 100 #note()
- [x] tracking_number: str 100 #note #note()()
- [x] shipping_note: str 500 #note() #note()
- [x] tracking_url: str 2000 #note()
- [x] shipping_type: str 50 #note()
- [x] carrier: str 50 #note()
-
- [ ] recipient: {}
- [ ] add()
      <br/>
