"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const DEPARTMENTS = [
  "General Medicine",
  "Dental Care",
  "Pediatrics",
  "Lab & Diagnostics",
];
const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:30 PM"];
const CONTACT_METHODS = ["Email", "Phone call", "SMS"];

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  department: "",
  preferredDate: "",
  alternateDate: "",
  timeSlot: "",
  patientType: "",
  patientId: "",
  reason: "",
  contactMethods: [],
};

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function validate(values, fileInfo) {
  const errors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name (at least 2 characters).";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else {
    const email = values.email.trim();
    const atIndex = email.indexOf("@");
    const domain = email.slice(atIndex + 1);

    if (
      atIndex <= 0 ||
      atIndex !== email.lastIndexOf("@") ||
      email.includes(" ") ||
      !domain.includes(".") ||
      domain.startsWith(".") ||
      domain.endsWith(".")
    ) {
      errors.email = "Enter a valid email address, like name@example.com.";
    }
  }

  const cleanedPhone = values.phone.replace(/[\s-]/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?\d{7,15}$/.test(cleanedPhone)) {
    errors.phone =
      "Enter a valid phone number (7–15 digits, optional + prefix).";
  }

  if (!values.dob) {
    errors.dob = "Date of birth is required.";
  } else if (values.dob > todayISO()) {
    errors.dob = "Date of birth can't be in the future.";
  }

  if (!values.department) {
    errors.department = "Choose a department.";
  }

  if (!values.preferredDate) {
    errors.preferredDate = "Choose a preferred appointment date.";
  } else if (values.preferredDate < todayISO()) {
    errors.preferredDate = "Preferred date must be today or later.";
  }

  // Cross-field rule: alternate date must be after preferred date.
  if (values.alternateDate) {
    if (!values.preferredDate) {
      errors.alternateDate = "Set a preferred date first.";
    } else if (values.alternateDate <= values.preferredDate) {
      errors.alternateDate = "Alternate date must be after the preferred date.";
    }
  }

  if (!values.timeSlot) {
    errors.timeSlot = "Choose a preferred time slot.";
  }

  if (!values.patientType) {
    errors.patientType = "Let us know if you're a new or returning patient.";
  }

  // Cross-field / conditional rule: patient ID only required for returning patients.
  if (values.patientType === "returning" && !values.patientId.trim()) {
    errors.patientId = "Enter your patient ID to look up your record.";
  }

  if (!values.reason.trim() || values.reason.trim().length < 10) {
    errors.reason = "Describe your reason for visiting (10+ characters).";
  }

  if (values.contactMethods.length === 0) {
    errors.contactMethods = "Choose at least one way for us to reach you.";
  }

  if (fileInfo) {
    const okTypes = ["pdf", "jpg", "jpeg", "png"];
    const ext = fileInfo.name.split(".").pop().toLowerCase();
    if (!okTypes.includes(ext)) {
      errors.file = "File must be a PDF, JPG, or PNG.";
    } else if (fileInfo.size > 5 * 1024 * 1024) {
      errors.file = "File must be smaller than 5MB.";
    }
  }

  return errors;
}

function FieldError({ message, id }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-700">
      {message}
    </p>
  );
}

const inputBase =
  "w-full rounded-md border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-teal";

function borderClass(hasError) {
  return hasError ? "border-red-400" : "border-line";
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const presetService = searchParams.get("service") || "";

  const [values, setValues] = useState(() => ({
    ...initialValues,
    department: DEPARTMENTS.includes(presetService) ? presetService : "",
  }));
  const [fileInfo, setFileInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const bannerService = useMemo(() => presetService, [presetService]);

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function toggleContactMethod(method) {
    setValues((v) => {
      const has = v.contactMethods.includes(method);
      return {
        ...v,
        contactMethods: has
          ? v.contactMethods.filter((m) => m !== method)
          : [...v.contactMethods, method],
      };
    });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    setFileInfo(file ? { name: file.name, size: file.size } : null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values, fileInfo);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted({ ...values, fileName: fileInfo?.name || null });
    } else {
      setSubmitted(null);
    }
  }

  function handleReset() {
    setValues({ ...initialValues });
    setFileInfo(null);
    setErrors({});
    setSubmitted(null);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm font-medium text-amber-dark">
        Page 2 · Appointment request
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
        Tell us a bit about your visit
      </h1>
      <p className="mt-3 max-w-xl text-sm text-ink/70">
        Fields marked with an asterisk are required. We'll confirm your slot by
        email within one business hour.
      </p>

      {bannerService && (
        <div className="mt-6 rounded-md border border-sage bg-sage-light px-4 py-3 text-sm text-teal-dark">
          Booking for: <span className="font-medium">{bannerService}</span>
        </div>
      )}

      {submitted && (
        <div className="mt-8 rounded-lg border border-sage bg-white p-6">
          <h2 className="font-display text-xl text-teal-dark">
            Request received
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Here's a summary of what you submitted. No data was sent anywhere —
            this is a front-end-only demo.
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <SummaryRow label="Full name" value={submitted.fullName} />
            <SummaryRow label="Email" value={submitted.email} />
            <SummaryRow label="Phone" value={submitted.phone} />
            <SummaryRow label="Date of birth" value={submitted.dob} />
            <SummaryRow label="Department" value={submitted.department} />
            <SummaryRow
              label="Preferred date"
              value={submitted.preferredDate}
            />
            <SummaryRow
              label="Alternate date"
              value={submitted.alternateDate || "—"}
            />
            <SummaryRow label="Time slot" value={submitted.timeSlot} />
            <SummaryRow
              label="Patient type"
              value={
                submitted.patientType === "returning"
                  ? "Returning patient"
                  : "New patient"
              }
            />
            {submitted.patientType === "returning" && (
              <SummaryRow label="Patient ID" value={submitted.patientId} />
            )}
            <SummaryRow
              label="Contact via"
              value={submitted.contactMethods.join(", ")}
            />
            <SummaryRow
              label="Attachment"
              value={submitted.fileName || "None"}
            />
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-ink/50">
                Reason for visit
              </dt>
              <dd className="mt-0.5 text-ink/80">{submitted.reason}</dd>
            </div>
          </dl>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-ink">
              Full name *
            </label>
            <input
              id="fullName"
              type="text"
              value={values.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.fullName)}`}
              aria-invalid={!!errors.fullName}
              aria-describedby="fullName-error"
              placeholder="Jordan Rivera"
            />
            <FieldError id="fullName-error" message={errors.fullName} />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.email)}`}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              placeholder="jordan@example.com"
            />
            <FieldError id="email-error" message={errors.email} />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-ink">
              Phone number *
            </label>
            <input
              id="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.phone)}`}
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
              placeholder="+1 555 010 2938"
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>

          <div>
            <label htmlFor="dob" className="text-sm font-medium text-ink">
              Date of birth *
            </label>
            <input
              id="dob"
              type="date"
              value={values.dob}
              max={todayISO()}
              onChange={(e) => update("dob", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.dob)}`}
              aria-invalid={!!errors.dob}
              aria-describedby="dob-error"
            />
            <FieldError id="dob-error" message={errors.dob} />
          </div>

          <div>
            <label
              htmlFor="department"
              className="text-sm font-medium text-ink"
            >
              Department *
            </label>
            <select
              id="department"
              value={values.department}
              onChange={(e) => update("department", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.department)}`}
              aria-invalid={!!errors.department}
              aria-describedby="department-error"
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <FieldError id="department-error" message={errors.department} />
          </div>

          <div>
            <label htmlFor="timeSlot" className="text-sm font-medium text-ink">
              Preferred time slot *
            </label>
            <select
              id="timeSlot"
              value={values.timeSlot}
              onChange={(e) => update("timeSlot", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.timeSlot)}`}
              aria-invalid={!!errors.timeSlot}
              aria-describedby="timeSlot-error"
            >
              <option value="">Select a time</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <FieldError id="timeSlot-error" message={errors.timeSlot} />
          </div>

          <div>
            <label
              htmlFor="preferredDate"
              className="text-sm font-medium text-ink"
            >
              Preferred appointment date *
            </label>
            <input
              id="preferredDate"
              type="date"
              value={values.preferredDate}
              min={todayISO()}
              onChange={(e) => update("preferredDate", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.preferredDate)}`}
              aria-invalid={!!errors.preferredDate}
              aria-describedby="preferredDate-error"
            />
            <FieldError
              id="preferredDate-error"
              message={errors.preferredDate}
            />
          </div>

          <div>
            <label
              htmlFor="alternateDate"
              className="text-sm font-medium text-ink"
            >
              Alternate date (optional)
            </label>
            <input
              id="alternateDate"
              type="date"
              value={values.alternateDate}
              onChange={(e) => update("alternateDate", e.target.value)}
              className={`mt-1.5 ${inputBase} ${borderClass(errors.alternateDate)}`}
              aria-invalid={!!errors.alternateDate}
              aria-describedby="alternateDate-error"
            />
            <p className="mt-1 text-xs text-ink/50">
              Must fall after your preferred date.
            </p>
            <FieldError
              id="alternateDate-error"
              message={errors.alternateDate}
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-ink">
            Patient type *
          </legend>
          <div className="mt-2 flex gap-6">
            <label className="flex items-center gap-2 text-sm text-ink/80">
              <input
                type="radio"
                name="patientType"
                value="new"
                checked={values.patientType === "new"}
                onChange={() => update("patientType", "new")}
                className="h-4 w-4 accent-teal"
              />
              <span>New patient</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-ink/80">
              <input
                type="radio"
                name="patientType"
                value="returning"
                checked={values.patientType === "returning"}
                onChange={() => update("patientType", "returning")}
                className="h-4 w-4 accent-teal"
              />
              <span>Returning patient</span>
            </label>
          </div>
          <FieldError id="patientType-error" message={errors.patientType} />
        </fieldset>

        {values.patientType === "returning" && (
          <div>
            <label htmlFor="patientId" className="text-sm font-medium text-ink">
              Patient ID *
            </label>
            <input
              id="patientId"
              type="text"
              value={values.patientId}
              onChange={(e) => update("patientId", e.target.value)}
              className={`mt-1.5 max-w-xs ${inputBase} ${borderClass(errors.patientId)}`}
              aria-invalid={!!errors.patientId}
              aria-describedby="patientId-error"
              placeholder="e.g. HV-10432"
            />
            <FieldError id="patientId-error" message={errors.patientId} />
          </div>
        )}

        <div>
          <label htmlFor="reason" className="text-sm font-medium text-ink">
            Reason for visit *
          </label>
          <textarea
            id="reason"
            rows={4}
            value={values.reason}
            onChange={(e) => update("reason", e.target.value)}
            className={`mt-1.5 ${inputBase} ${borderClass(errors.reason)}`}
            aria-invalid={!!errors.reason}
            aria-describedby="reason-error"
            placeholder="A short description helps your clinician prepare."
          />
          <FieldError id="reason-error" message={errors.reason} />
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-ink">
            Preferred contact method *
          </legend>
          <div className="mt-2 flex flex-wrap gap-6">
            {CONTACT_METHODS.map((method) => (
              <label
                key={method}
                className="flex items-center gap-2 text-sm text-ink/80"
              >
                <input
                  type="checkbox"
                  checked={values.contactMethods.includes(method)}
                  onChange={() => toggleContactMethod(method)}
                  className="h-4 w-4 accent-teal"
                />
                {method}
              </label>
            ))}
          </div>
          <FieldError
            id="contactMethods-error"
            message={errors.contactMethods}
          />
        </fieldset>

        <div>
          <label htmlFor="file" className="text-sm font-medium text-ink">
            Upload referral or records (optional)
          </label>
          <input
            id="file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className={`mt-1.5 block w-full text-sm text-ink/70 ${
              errors.file ? "text-red-700" : ""
            }`}
            aria-describedby="file-error"
          />
          <p className="mt-1 text-xs text-ink/50">
            PDF, JPG, or PNG, up to 5MB.
          </p>
          <FieldError id="file-error" message={errors.file} />
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="rounded-md bg-amber px-6 py-3 text-sm font-medium text-white hover:bg-amber-dark transition-colors"
          >
            Request appointment
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-line px-6 py-3 text-sm font-medium text-ink/70 hover:bg-teal-light transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink/50">{label}</dt>
      <dd className="mt-0.5 text-ink/80">{value}</dd>
    </div>
  );
}
